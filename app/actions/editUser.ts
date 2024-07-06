"use server";
import bcrypt from "bcrypt";
import client from "@/db";
import sharp from "sharp";
import { s3Client } from "@/s3/s3Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function editUser(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { status: 400, message: "User not logged in" };
  }
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const image = formData.get("file") as unknown as File;
  const newPass = formData.get("newpassword") as string;
  const hashed = await bcrypt.hash(newPass, 10);
  try {
    const existUser = await client.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
    });
    if (!existUser) {
      return { status: 400, message: "No user found" };
    }
    const compare = await bcrypt.compare(
      password,
      existUser.password as string
    );
    if (!compare) {
      return { status: 404, message: "Wrong Password" };
    }
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
      const user = await client.user.update({
        data: {
          username: username,
          password: hashed,
          image: `${process.env.USER_IMAGE_URL}/${username}.jpg`,
        },
        where: {
          id: Number(existUser.id),
        },
      });
    } else {
      const user = await client.user.update({
        data: {
          username: username,
          password: hashed,
          image: existUser.image,
        },
        where: {
          id: Number(existUser.id),
        },
      });
    }
    return { status: 200, message: "Edit user Successful" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
}
