// app/api/documents/[key]/route.ts
import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";

const BUCKET_NAME = "boombahtime-media";
const BUCKET_REGION = "us-east-2";
const s3 = new S3Client({ region: BUCKET_REGION });

// Bucket and s3: same as above
export async function GET(_: Request, { params }: { params: { key: string } }) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: params.key,
  });
  // @ts-ignore
  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return NextResponse.json({ src });
}
