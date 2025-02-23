"use client";
import * as React from "react";
import Image from "next/image";
import { Images } from "./components";

export default function Home() {
  const inputRef = React.useRef<HTMLInputElement>();

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
              onClick={async () => {
                const input: HTMLInputElement | undefined = inputRef.current;
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
              }}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
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
      <div className="bg-red-100 absoslute b-0 r-0 w-[600px] h-[600px] rounded-xl p-12">
        <Images />
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
