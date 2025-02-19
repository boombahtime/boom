// app/api/documents/[key]/route.ts
import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";

const Bucket = "boombahtime-media";

const s3 = new S3Client({});

// Bucket and s3: same as above
export async function GET(_: Request, { params }: { params: { key: string } }) {
  console.log("UMmmdmdmd hello?????");

  const command = new GetObjectCommand({ Bucket, Key: params.key });

  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

  console.log("S R C :: ", src);

  return NextResponse.json({ src });
}
