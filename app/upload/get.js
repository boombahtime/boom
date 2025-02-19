"use server";
import { readFile } from "fs/promises";
import {
  S3Client,
  S3ServiceException,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

/**
 * Upload a file to an S3 bucket.
 * @param {{ bucketName: string, prefix: string }}
 */
export const getObject = async ({ bucketName, key, prefix }) => {
  const client = new S3Client({ region: "us-east-2" });
  return client.send(
    new GetObjectCommand({
      Prefix: prefix,
      Bucket: bucketName,
      key: key,
    })
  );
  // const command = new GetObjectCommand({
  //   Prefix: prefix,
  //   Bucket: bucketName,
  //   key: key,
  // });

  // try {
  //   const response = await client.send(
  //     new GetObjectCommand({
  //       Prefix: prefix,
  //       Bucket: bucketName,
  //       key: key,
  //     })
  //   );
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
  //     console.log("response");
  //     console.log(response);
  //     return response;
  //   } catch (caught) {
  //     console.log("GET.GETOBJECT.ERR: ", caught);
  //     if (
  //       caught instanceof S3ServiceException &&
  //       caught.name === "EntityTooLarge"
  //     ) {
  //       console.error(
  //         `Error from S3 while uploading object to ${bucketName}. \
  // The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
  // or the multipart upload API (5TB max).`
  //       );
  //     } else if (caught instanceof S3ServiceException) {
  //       console.error(
  //         `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`
  //       );
  //       console.log(caught);
  //     } else {
  //       console.log(caught);
  //       throw caught;
  //     }
  // }
};
