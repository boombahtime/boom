"use client";

import Image from "next/image";
import { upload } from "./upload";
import { listObjects } from "./read";
import * as React from "react";

const bucketName = "boombahtime-media";
const prefix = "/uploads";
const urlPrefix = "https://boombahtime-media.s3.us-east-2.amazonaws.com";

// const getImage = async () => {
//   console.log('GET IMAGE')
//   // console.log(event.target)
//   let arrayBuffer = await axios.get("/api/get-object", {responseType: 'arraybuffer'})
//   console.log(arrayBuffer.data)
//   let base64 = 'data:image/png;base64,' + Buffer.from(arrayBuffer.data).toString('base64')
//   console.log(base64)
//   event.target.src = base64
// }

export default function Home() {
  const [uploading, setUploading] = React.useState(false);
  const [objects, setObjects] = React.useState([]);
  const [once, setOnce] = React.useState(false);

  const imgRef = React.useRef();

  React.useEffect(() => {
    async function dd() {
      console.log("once : ", once);
      console.log("prefix: ", prefix);
      console.log("bucketName: ", bucketName);

      setOnce(true);

      let r = await listObjects({
        prefix: prefix,
        bucketName: bucketName,
      });

      console.log("r");
      console.log(r);

      let base64 = "data:image/png;base64," + r[0];

      console.log(base64);
      console.log("imgRef: ", imgRef);

      if (imgRef.current) {
        console.log("settings it");
        console.log(base64);
        imgRef.current.src = base64;
      }
      setObjects(r);
    }
    if (!once) {
      dd();
    }
  }, []);

  console.log("objects");
  console.log(objects);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>HOME</h1>
        <img ref={imgRef} className="w-32 bg-blue-50" />
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed top-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By yacobeter v0.1.0
            </a>
          </div>
          {/* {objects && (
            <div className="bg-red-50 z-99">
              {objects.map((m) => {
                console.log(m.Key);

                return (
                  <div
                    key={m.Key}
                    className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px]"
                  >
                    {/png/.test(m.Key) ? (
                      <Image src={urlPrefix + m.Key} />
                    ) : (
                      m.Key
                    )}
                  </div>
                );
              })}
            </div>
          )} */}
          <div
            id="bob"
            className="absolute bg-red-200 w-[200px] h-[100px]"
            onClick={() => {
              console.log("ff");
              upload({
                prefix: prefix,
                bucketName: bucketName,
                filePath: "./asdf.png",
                key: "bob.png",
              });
            }}
          >
            asdfasdfasdfasdfasdfasdf
          </div>
        </div>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/boombahtimeworkmark.svg"
            alt="Next.js Logo"
            width={480}
            height={300}
            priority
          />
        </div>
        {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <div
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 cursor-pointer"
            onClick={() => {
              setUploading(true);
            }}
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Selecte{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}></p>``
          </div>
        </div> */}
        <div className="fixed w-full h-full top-0 left-0 bg-blue-200 p-4 opacity-50">
          <input
            className="absolute w-full h-full top-0 left-0 bg-red-200"
            type="file"
          />
        </div>{" "}
      </main>
    </>
  );
}
