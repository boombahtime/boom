import * as React from "react";
import { DeleteButton } from "../DeleteButton";

export const S3Audio = ({
  setUploading,
  Key,
}: {
  setUploading: (value: React.SetStateAction<boolean>) => void;
  Key: string;
}) => {
  console.log("S3Audio: ", Key);

  const [dd, setDD] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function bo() {
      const da = await fetch(`/api/documents/${Key}`);
      const data = await da.json();
      setDD(data.src);
    }
    bo();
  }, [Key]);

  async function handleDelete() {
    setUploading(true);
    await fetch(`/api/documents/delete/${Key}`);
    setUploading(false);
  }

  return dd ? (
    <div
      key={Key}
      className="relative h-auto max-w-full rounded-lg bg-slate-900 justify-center items-center flex p-4"
    >
      <DeleteButton onClick={handleDelete} />
      <figure key={Key}>
        <figcaption>Listen to {Key?.slice(10, 20)}:</figcaption>
        <audio src={dd} controls></audio>
        <a href={Key}> Download audio </a>
      </figure>
    </div>
  ) : null;
};
