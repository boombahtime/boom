import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const bucketName = "boombahtime-media";
const Bucket = bucketName;
const s3 = new S3Client({});

// endpoint to get the list of files in the bucket
export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  const nextResponse = NextResponse.json(response?.Contents ?? []);
  return nextResponse;
}

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  const response = await Promise.all(
    files.map(async (file, fileIdx) => {
      // not sure why I have to override the types here
      const Body = (await file.arrayBuffer()) as Buffer;
      s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));
    })
  );
  return NextResponse.json(response);
}
