import * as React from "react";
import useSWR from "swr";
import Image from "next/image";

export const Images = () => {
  const { data } = useSWR<{ Key?: string }[]>(
    "/api/documents",
    async (path: string) => {
      const f = await fetch(path).then((res) => res.json());
      return f;
    }
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {data
        ?.filter(
          (image) =>
            typeof image.Key == "string" &&
            image.Key != "" &&
            !/\//.test(image.Key)
        )
        .map((image, imageIdx) => (
          <S3Image
            Key={image?.Key ? image.Key : "p" + imageIdx}
            key={image?.Key ? image.Key : "p" + imageIdx}
          />
        ))}
    </div>
  );
};

const S3Image = ({ Key }: { Key: string }) => {
  const [dd, setDD] = React.useState<string | null>(null);
  React.useEffect(() => {
    async function bo() {
      const da = await fetch(`/api/documents/${Key}`);
      const data = await da.json();
      setDD(data.src);
    }
    bo();
  }, [Key]);
  return dd ? (
    <div key={Key} className="h-auto max-w-full rounded-lg">
      <Image width={100} height={100} key={Key} alt="asshoole" src={dd} />
    </div>
  ) : null;
};
