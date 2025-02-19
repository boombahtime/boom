"use server";
import { readFile } from "fs/promises";
import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";
const { Readable } = require("stream");
const bucketName = "boombahtime-media";

/**
 * Upload a file to an S3 bucket.
 * @param {{  prefix: string, file: Buffer, name: string }}
 */
export const upload = async ({ dd, prefix, file, name, buffer }) => {
  const client = new S3Client({ region: "us-east-2" });

  console.log("1. ", name);
  console.log("2. ", file.type);
  // console.log("3. ", file.length);
  console.log("4. ", file);

  // const theReadFile = await readFile(filePath);
  console.log(Object.keys(file));

  // const command = new PutObjectCommand({
  //   Bucket: bucketName,
  //   Key: prefix + "/" + name,
  //   // ContentType: "image/png",
  //   // ContentType: file.type,
  //   // ContentLength: file.length,
  //   // Body: createReadStream(file),
  //   Body: dd,
  //   // Body: buffer.data,
  //   // ACL: "public-read",
  // });
  // const upload = new Upload({
  //   client: new S3Client(options),
  //   params: target
  // // });
  // console.log(Object.keys(file));
  // console.log(Object.keys(buffer));
  // console.log(buffer.data, buffer.type);
  // console.log("typeof : ", typeof file, typeof buffer);
  // const stream = Readable.from(buffer.data);

  const upload = new Upload({
    client: new S3Client({}),
    params: {
      Bucket: bucketName,
      Key: prefix + "/" + name,
      Body: dd,
      // Body: stream,
      // Body: file,
      // ContentType: file.type,
      // ContentType: "image/png",
    },
  });
  upload.on("httpUploadProgress", (evt) => {
    console.log(evt);
  });
  let dun = await upload.done();
  console.log("dun: ", dun);
  return;
  try {
    // Upload();
    const response = await client.send(command);
    /**
    {
      '$metadata': {
        httpStatusCode: 200,
        requestId: 'ZF154TNTTJ00K77H',
        extendedRequestId: 'L2wvGujkvju0tth65oRvfsKB8rtQCdAk7AgNdgbPJCMhf/sW9T9rqqQn4SO9lfYmCgc5Zsme5Xs=',
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0
      },
      ETag: '"dde56abef21c51383a013994369f4624"',
      ServerSideEncryption: 'AES256'
    }
    */
    console.log("response");
    console.log(response);
  } catch (caught) {
    if (
      caught instanceof S3ServiceException &&
      caught.name === "EntityTooLarge"
    ) {
      console.error(
        `Error from S3 while uploading object to ${bucketName}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`
      );
    } else if (caught instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`
      );
      console.log(caught);
    } else {
      console.log(caught);
      throw caught;
    }
  }
};
