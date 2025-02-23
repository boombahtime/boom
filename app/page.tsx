"use client";
import * as React from "react";
import Image from "next/image";
import { Images } from "./components";

export default function Home() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 gap-8">
      {/* 
██████╗  ██████╗  ██████╗ ███╗   ███╗██████╗  █████╗ ██╗  ██╗
██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║██╔══██╗██╔══██╗██║  ██║
██████╔╝██║   ██║██║   ██║██╔████╔██║██████╔╝███████║███████║
██╔══██╗██║   ██║██║   ██║██║╚██╔╝██║██╔══██╗██╔══██║██╔══██║
██████╔╝╚██████╔╝╚██████╔╝██║ ╚═╝ ██║██████╔╝██║  ██║██║  ██║
╚═════╝  ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
                                                              */}
      <div>
        <div className="relative top-[-50px] flex place-items-center before:absolute before:h-[300px] before:w-[380px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[160px] after:w-[180px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[260px] z-[-1]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/boombahtimeworkmark.svg"
            alt="Next.js Logo"
            width={280}
            height={200}
            priority
          />
        </div>
      </div>
      <div>
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
          <div className="bg-blue-200 p-4 opacity-90">
            <input className="bg-red-200" type="file" ref={inputRef} />
            <button
              disabled={!!uploading}
              onClick={async () => {
                setUploading(true);
                const input: HTMLInputElement | null = inputRef.current;
                if (!input) {
                  return;
                }
                const file: File | null =
                  input?.files && input.files.length > 0
                    ? input.files[0]
                    : null;
                if (!file) {
                  return;
                }
                const body = new FormData();
                body.append("file", file, file.name);
                const response = await fetch("/api/documents", {
                  method: "POST",
                  body,
                });
                await response.json();
                if (inputRef?.current) {
                  inputRef.current.value = null;
                }
                setUploading(false);
              }}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              {uploading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <></>
              )}
              <span
                className={
                  "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
                }
              >
                keep it
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* .......___           ___           ___           ___           ___     
                 /\  \         /\  \         /\__\         /\__\         /\__\    
    ___         |::\  \       /::\  \       /:/ _/_       /:/ _/_       /:/ _/_   
   /\__\        |:|:\  \     /:/\:\  \     /:/ /\  \     /:/ /\__\     /:/ /\  \  
  /:/__/      __|:|\:\  \   /:/ /::\  \   /:/ /::\  \   /:/ /:/ _/_   /:/ /::\  \ 
 /::\  \     /::::|_\:\__\ /:/_/:/\:\__\ /:/__\/\:\__\ /:/_/:/ /\__\ /:/_/:/\:\__\
 \/\:\  \__  \:\~~\  \/__/ \:\/:/  \/__/ \:\  \ /:/  / \:\/:/ /:/  / \:\/:/ /:/  /
  ~~\:\/\__\  \:\  \        \::/__/       \:\  /:/  /   \::/_/:/  /   \::/ /:/  / 
     \::/  /   \:\  \        \:\  \        \:\/:/  /     \:\/:/  /     \/_/:/  /  
     /:/  /     \:\__\        \:\__\        \::/  /       \::/  /        /:/  /   
     \/__/       \/__/         \/__/         \/__/         \/__/         \/__/     */}
      <div className="bg-red-100 absoslute b-0 r-0 w-[600px] h-auto rounded-xl p-12">
        <Images loading={!!uploading} />
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* <a
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
        </a> */}
      </div>
    </main>
  );
}
