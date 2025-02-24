import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

const BUCKET_NAME = "boombahtime-media";
const BUCKET_REGION = "us-east-2";
const s3 = new S3Client({ region: BUCKET_REGION });

export async function GET(_: Request, { params }: { params: { key: string } }) {
  console.log("deleteing:", params.key);
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: params.key,
  });
  const deleted = await s3.send(command);
  return NextResponse.json({ deleted });
}
