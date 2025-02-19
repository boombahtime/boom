"use server";
import { readFile } from "fs/promises";
import {
  S3Client,
  S3ServiceException,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { createWriteStream } from "fs";

const client = new S3Client({ region: "us-east-2" });
/**
 * Upload a file to an S3 bucket.
 * @param {{ bucketName: string, prefix: string }}
 */
export const listObjects = async ({ bucketName, prefix }) => {
  console.log("listObjects");

  const response = await client.send(
    new ListObjectsV2Command({
      Prefix: prefix,
      Bucket: bucketName,
    })
  );

  console.log("response:", response);
  // return [];
  let contents;
  if (response.Contents) {
    console.log("contents");
    console.log(response.Contents);

    try {
      let content1 = await client.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: response.Contents[0].Key,
        })
      );

      // contents = await Promise.all(
      //   response.Contents.map(async (mm) => {
      //     return client.send(
      //       new GetObjectCommand({
      //         Bucket: bucketName,
      //         Key: mm.Key,
      //       })
      //     );
      //   })
      // );

      // console.log("321contents");
      console.log(content1.Body);

      const boob = await streamToString(content1.Body);
      return [boob];
    } catch (e) {
      console.log("EEE:");
      console.lolg(e);
    }
  } else {
    console.log("response , no contents: ", response);
  }

  return contents;
};

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
  });
