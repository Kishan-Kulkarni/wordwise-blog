"use server";
import bcrypt from "bcrypt";
import client from "@/db";
import path from "path";
import { writeFile } from "fs/promises";
import sharp from "sharp";
import { s3Client } from "@/s3/s3Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
export default async function register(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const image = formData.get("file") as unknown as File;
  const hashed = await bcrypt.hash(password, 10);
  try {
    if (image) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const resized = await sharp(bytes)
        .resize(2000, 2000, { withoutEnlargement: true, fit: "inside" })
        .withMetadata()
        .jpeg({ quality: 80 })
        .toBuffer();
      const params = {
        Bucket: process.env.USER_BUCKET_NAME,
        Key: `${username}.jpg`,
        Body: resized,
        ContentType: "image/jpg",
      };
      const command = new PutObjectCommand(params);
      const response = await s3Client.send(command);
      const user = await client.user.create({
        data: {
          username: username,
          password: hashed,
          image: `${process.env.USER_IMAGE_URL}/${username}.jpg`,
        },
      });
    } else {
      const user = await client.user.create({
        data: {
          username: username,
          password: hashed,
          image: "/userDefault.png",
        },
      });
    }
    return { status: 200, message: "User created" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Serever Error" };
  }
}
