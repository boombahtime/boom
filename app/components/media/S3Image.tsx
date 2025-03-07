import * as React from "react";
import Image from "next/image";
import { DeleteButton } from "../DeleteButton";

export const S3Image = ({
  setUploading,
  setCurrentImage,
  Key,
  w = 100,
  h = 100,
}: {
  w?: number;
  h?: number;
  setUploading: (value: React.SetStateAction<boolean>) => void;
  setCurrentImage: (value: React.SetStateAction<string | null>) => void;
  Key: string;
}) => {
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
    const da = await fetch(`/api/documents/delete/${Key}`);
    setUploading(false);
  }

  return dd ? (
    <div
      key={Key}
      className="relative h-auto max-w-full rounded-xl bg-slate-800 justify-center items-center flex p-4"
    >
      <DeleteButton onClick={handleDelete} />

      <Image
        onClick={() => setCurrentImage(Key)}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        width={w}
        height={h}
        key={Key}
        alt="asshoole"
        src={dd}
      />
    </div>
  ) : null;
};

const blurDataUrl = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCATLAvIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOMAAAAAAAAABQAAAUABUUAABUUAABUUAAAAAAAAABVAAAEABQABAAAAQAABBAAAAQAAAAAQRUAAAAAAAAAAAAAAAVFAAAAAAAAAVFAAAAAABkAAAAAAAAAFAAABQAFRQAAFRQAAFRQAAAAABQAQAVQAABAAUAAQAAAEAQAAQAAAEAAAAAEEVAAAAAAAAAAAAAAAAAUAAAAAAABUUAAAAAAGQAAAAAAAAAUAAAFAAVFAAAVFAAAVFAAAAAAFABABVAAAAAAAAQAAEAAAAQQAAAEAAAAAEEVAAAAAAAAAAAAAAAAAUAAAAAAABUUAAAAAAGQAAAAAAAAAUAAAFAAVFAAAVFAAAVFAAAAAAAAVQAABAAUAAEVAAAEVAAAAEEAAABAAAAABBFQAAAAAAAAAAAAAAAAFAAAAAAAAABQAAAAAZAAAAAAAAABQAAAUABUUAABUUAABUUAAAAAAAAUAAAAAUAAEVAAAEVAAEAAEAAABAAAAABBFQAAAAAAAAAAAAAAAAFAAAAAAAAABQAAAAAZAAAAAAAAABQAAAUABUUAABUUAABUUAAAAAAAAAAUAEAFUAARUAAARUAAQAAQAAAEAAAAAEEVAAAAAAAAAAAAAAAAAUAAAAAAAAAFAAAAABkAAAAAAAAAFAAABQAFRQAAFRQAAAAUAAAAAAAAAAAABVAAEVAAAEVAAEAEAAABAAAAAABBFQAAAAAAAAAAAAAAAAFAAAAAAAAABRFAAAABkAAAAAAAAAFAAAAVFAVAFAAVAFAAABQAAAAAAAAAAFUAQAFBAAAARUQAAEVAAAEVAAAABAABFQAAAAAAAAAAAAAAAAFAAAAAAAAAAVFAAAABkAAAAAAAAAFAAAAVFAABQAAAUAAAFEUAAAAAAAAAAUAAAUQAAABAAAQEVAAAEVAAAABAAEAAAAAAAAAAAAAAAAABQAAAAAAAAAFQBQAAAZAAAAAAAAABQAAAFRQAAUAAAFAAAAVFAAAAAAAAFAAAAAQABQABAAAEBFQAABFQAAAAQABAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAFEUAAGQAAAAAAAAAUAAABUUAAFAAABQAAAAAUAAAAAAAAAAAUQAAAAAQAAABFQAABAAAAAEAAQAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAABAAAAAAAAAAUAAABUUAAFEUAABUUAAAAFEUAAAAAAAAAEFAAAAAQAAAAEAAABAAAAABAAEAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAQAAAAAAAAAFEUAAAAFAAVFAAAVFAAAAAABQAAAAAAQUAEABQABFQAAAAEAAABAAAAABAEAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAQAAAAAAAAABUUAAAAFAAVFAAAABQAAAAAAAUQAAAAAAFAAAAQAAAAEAAABAAAAAABBFQAAAAAAAAAAAAAAAAAAFEUAAAAAAAAAAAAAAEAAAAAAAAAAVFAAAABQAAAUAAAFAAAAAAAAAAAAAAAFAAEVAAAAAEVAAAEVAAAABAABFQAAAAAAAAAAAAAAAAAABUUAAAAAAAAAAAAAAEAAAAAAAAAAVFAAAABQAAAUAAABUUAAAAAAAAAAAAAAAAVAAAAAAQAAABAAAEAAAAEAAAAAAAAAAAAAAAAAAABUUAAAAAAAAAAAAAAEAAAAAAAAAAVFAAAABRFAAAVFAAAABQAAAAAAAAAAAAAEAAAUAABAAAAAQAQAAAAABAAAAAAAAAAAAAAAAAAAAFRQAAAAAAAAAAAAAAQAAAAAAAAABUUAAAABUUAABUAUAAABUAUAAAAAAAAABAAAAAAAFEVAAAAQQAAAAAAABAAAAAAAAAAAAAAAAAAAAFRQAAAAAAAAAAAAAAQAAAAAAAAABUUAAAABUUAAAAFAAAAAAVAFAAAAAAQAAAAAAAAAQAAABFQAAAAAABFQAAAAAAAAAAAAAAAAAAAABUAUAAAAAAAAAAAAAEAAAAAAAAAAVFAAAAAVAFAAAAVFAAAAAAAVAFEAAAAAAAAAAAEVAAAAAQAAAAAAABFQAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAABAAAAAAAAAAFRQAAAAAAUAAAAAFAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAABFQAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAABAAAAAAAAAAFRQAAAAAAURQAAAAFRQAAAAAAAAAAAAAAAAAQAAAABFQAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAQAAAAAAAAABUUAAAAAABUUAAAAAAFAAAAAAAAAAAAAAAAQAAAAAEAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAVFAAAAAAAAAAAABAAAAAAAAAAFRQAAAAAAFQBQAAAAAFQBQAAAAAAAAAAAAQAAAAAAEAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAFRQAAAAAAAAAAAAQAAAAAAAAAAAFAAAAAAABQAAAAAAAAAURQAAAAAAAQAAAAAABFQAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAVAFAAAAAAAAAAABAAAAAAAAAAAAUAAAAAAABUUAAAAAAAAAABUAUQBUAAAAAAAAAEAAAAAAAAAARUAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAQAAAAAAAAAAAFAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAABFQAAAAAAAAAAAAAAAAAAAAAAAAAAFEUAAAAAAAAAAEAAAAAAAAAAABQAAAAAAAAAFQBQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFAAAAAAAAAABAAAAAAAAAAAAURQAAAAAAAAAAURQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAQAAAAAAAAAAABUUAAAAAAAAAAAABUAUAAAAAAEBRAFQAAAAAAAAAAAAAAAEVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAURQAAAAAAAAQAAAAAAAAAAABUUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAFAAAAAAABAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABRFAAAAAABAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAFAAAAABAAAAAAAAAAAAAAFRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUAURQAAQAAAAAAAAAAAAABUAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUUAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAEVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFQBQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUUAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAFAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUQBRAFEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUEFAAAAAQUBBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQRQAAAAAAAAAAAAARQEFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAABFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAABBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAEUBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAABQAAAAAQAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAUAAAAAAAEAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQQUBAAAAAAAAAAAAAUAAAAAAAAAAAAAAABQAAAAAAAQAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAABAAAAAAAAAAAAFRQAAAAAAAAAAAAAAAFAAAAAAABAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAH/2Q==`;
