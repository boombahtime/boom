"use client";
import * as React from "react";
import Image from "next/image";
import useSWR from "swr";
import { upload } from "./upload/upload";
import { listObjects } from "./upload/read";
// import { Image as MantimeImage } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import useSWRMutation from "swr/mutation";
const prefix = "uploads";
const urlPrefix = "https://boombahtime-media.s3.us-east-2.amazonaws.com";
const bucketName = "boombahtime-media";
const DEBUG_PAUSED = true;

const fetcher = async (path: string) => {
  const f = await fetch(path).then((res) => res.json());

  console.log("fff", f);

  return f;
};

const Images = () => {
  const { data } = useSWR<{ Key?: string }[]>("/api/documents", fetcher);

  console.log("DATA: ", data);

  return data
    ?.filter(
      (image) =>
        typeof image.Key == "string" && image.Key != "" && !/\//.test(image.Key)
    )
    .map((image) => <S3Image Key={image.Key} />);
};

const S3Image = ({ Key }: { Key: string }) => {
  console.log("K K K : ", Key);
  // const { data } = useSWR<{ src: string }>(`/api/documents/${Key}`, fetcher);
  const [dd, setDD] = React.useState();

  React.useEffect(() => {
    async function bo() {
      const da = await fetch(`/api/documents/${Key}`);
      console.log("da: ", da);
      const data = await da.json();

      console.log("d aaa ta: ", data);
      setDD(
        <img
          key={Key}
          // className="object-contain w-1/2"
          alt="asshoole"
          src={data.src}
        />
      );
    }
    bo();
  }, []);

  // const { data } = await fetch<{ src: string }>(
  //   `/api/documents/${Key}`,
  //   fetcher
  // );
  // return <MantimeImage src={data.src} />;

  // console.log("data ::", data);

  // return <img src={data.src} />;
  return dd;
};

async function uploadDocuments(
  url: string,
  { arg }: { arg: { files: FileWithPath[] } }
): Promise<_Object[]> {
  const body = new FormData();

  arg.files.forEach((file) => {
    body.append("file", file, file.name);
  });

  const response = await fetch(url, { method: "POST", body });

  return await response.json();
}

export function ImagePicker() {
  // when uploading a document, there seem to be a slight delay, so wait ~1s
  // before refreshing the list of documents `mutate("/api/documents")`.
  const { trigger } = useSWRMutation("/api/documents", uploadDocuments);

  return <Dropzone onDrop={(files) => trigger({ files })}>{"..."}</Dropzone>;
}

export default function Home() {
  const [uploading, setUploading] = React.useState(false);
  const [objects, setObjects] = React.useState([]);
  const [once, setOnce] = React.useState(false);

  const imgRef = React.useRef();
  const imgRef1 = React.useRef();
  const inputRef = React.useRef();

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
      let base641 = "data:image/png;base64," + r[1];

      console.log(base64);
      console.log("imgRef: ", imgRef);

      if (imgRef.current) {
        console.log("settings it");
        console.log(base64);
        imgRef.current.src = base64;
      }

      if (imgRef1.current) {
        console.log("settings it");
        console.log(base641);
        imgRef1.current.src = base641;
      }
      setObjects(r);
    }
    if (!DEBUG_PAUSED) {
      if (!once) {
        dd();
      }
    }
  }, []);

  // console.log("objects",objects);
  // console.log("input ref", inputRef.current?.files);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed top-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="bg-red-100 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <h1 id="h1-home" className="text-white text-2xl z-10">
              HOMEYY
            </h1>
          </div>
          {/* IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES
          IMAGES */}

          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            **By yacobeter v0.1.0
          </a>
        </div>
      </div>
      {/* BOOMBAHTIME */}
      {/* BOOMBAHTIME */}
      {/* BOOMBAHTIME */}
      {/* BOOMBAHTIME */}
      {/* BOOMBAHTIME */}
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
      <div className="bg-red-50 absolute b-0 r-0 w-[600px] h-[600px]">
        <Images />
        <div className="wall">
          <div className="row">
            <div className="brick">
              <S3Image Key="bob.png" />
            </div>
            <div className="brick">Lets</div>
            <div className="brick"></div>
            <div className="brick">Make</div>
            <div className="brick"></div>
          </div>
          <div className="row">
            <div className="brick"></div>
            <div className="brick">The</div>
            <div className="brick"></div>
            <div className="brick">World</div>
            <div className="brick"></div>
            <div className="brick"></div>
          </div>
          <div className="row">
            <div className="brick"></div>
            <div className="brick"></div>
            <div className="brick">Suck</div>
            <div className="brick">Less</div>
            <div className="brick"></div>
          </div>
        </div>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/upload"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            01\uploade{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>sdsd </p>
          <img ref={imgRef} className="w-32 bg-blue-50" />
          <img ref={imgRef1} className="w-32 bg-blue-50" />
        </a>
      </div>
      <div className="fixecd w-fcull h-fucll tocp-0 lecft-0 bg-blue-200 p-4 opacity-90">
        <input
          className="absoxlute w-fuxll h-fuxll toxp-0 lxeft-0 bg-red-200"
          type="file"
          ref={inputRef}
          onChange={(ev) => {
            console.log("ev.target.files: ", ev.target);
          }}
        />
        <button
          onClick={() => {
            const input: HTMLInputElement | undefined = inputRef.current;
            if (!input) {
              return;
            }
            console.log("input", input.files);
            const file: File = input?.files[0];
            console.log("file: ", file);
            // upload({
            //   prefix: prefix,
            //   name: file.name,
            //   file: file,
            //   buffer:
            // });
            // var params = {
            //   Key: file.name,
            //   ContentType: file.type,
            //   Body: file,
            //   ACL: "public-read",
            // };

            const reader = new FileReader();

            reader.onload = (event) => {
              const arrayBuffer = event.target.result;
              const buffer = Buffer.from(arrayBuffer);
              // Use the buffer here
              upload({
                prefix: prefix,
                name: file.name,
                file: file,
                // buffer: buffer,
                dd: buffer,
              });

              console.log(buffer);
            };
            reader.readAsDataURL(file);

            // reader.readAsArrayBuffer(file);
          }}
        >
          fuck off then
        </button>
      </div>{" "}
    </main>
  );
}
