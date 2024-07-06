import { S3Client } from "@aws-sdk/client-s3";
import { S3ClientConfig } from "@aws-sdk/client-s3";
export const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});
