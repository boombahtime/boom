import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const BUCKET_NAME = "boombahtime-media";
const BUCKET_REGION = "us-east-2";
const s3 = new S3Client({ region: BUCKET_REGION });

// endpoint to get the list of files in the bucket
export async function GET() {
  console.log("GET /documents");
  console.log("Bucket: ", BUCKET_NAME);
  console.log("GET /documents");
  const response = await s3.send(
    new ListObjectsCommand({ Bucket: BUCKET_NAME })
  );
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
      s3.send(
        new PutObjectCommand({ Bucket: BUCKET_NAME, Key: file.name, Body })
      );
    })
  );
  return NextResponse.json(response);
}
