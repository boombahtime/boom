import * as React from "react";
import { S3Audio } from "./S3Audio";
import { S3Image } from "./S3Image";
import { Modal } from "../Modal";

export const Media = ({
  setUploading,
  loading,
}: {
  setUploading: (value: React.SetStateAction<boolean>) => void;
  loading: boolean;
}) => {
  console.log("app/components/Media");

  const [data, setData] = React.useState<{ Key: string }[] | null>(null);
  const [currentImage, setCurrentImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function bop() {
      console.log("fetch(/api/documents)");
      const f = await fetch("/api/documents").then((res) => res.json());
      setData(f);
    }
    bop();
    console.log("asdf");
  }, [loading]);

  const audios = data?.filter(
    (image) =>
      typeof image.Key == "string" &&
      image.Key != "" &&
      !/\//.test(image.Key) &&
      (/\.wav/i.test(image.Key) || /\.m4a/i.test(image.Key))
  );

  const images = data?.filter(
    (image) =>
      typeof image.Key == "string" &&
      image.Key != "" &&
      !/\//.test(image.Key) &&
      !/\.wav/i.test(image.Key) &&
      !/\.m4a/i.test(image.Key)
  );

  return (
    <>
      <>
        {currentImage && (
          <div>
            <Modal
              onClose={() => {
                setCurrentImage(null);
              }}
              open={!!currentImage}
            >
              {
                <S3Image
                  w={500}
                  h={500}
                  setCurrentImage={setCurrentImage}
                  setUploading={setUploading}
                  Key={currentImage}
                  key={currentImage}
                />
              }
              CURRENT IMAGE
            </Modal>
          </div>
        )}
      </>
      <>
        {images && (
          <div className="pb-2">
            <h2 className="w-full text-center text-2xl font-bold pb-4">
              Images
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, imageIdx) => (
                <S3Image
                  setCurrentImage={setCurrentImage}
                  setUploading={setUploading}
                  Key={image?.Key ? image.Key : "p" + imageIdx}
                  key={image?.Key ? image.Key : "p" + imageIdx}
                />
              ))}
            </div>
          </div>
        )}
      </>

      <>
        {audios && (
          <div className="gap-2">
            <h2 className="w-full text-center flex text-2xl font-bold p-4">
              Audios
            </h2>
            <div id="audios" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audios.map((image, imageIdx) => (
                <S3Audio
                  setUploading={setUploading}
                  key={image.Key}
                  Key={image?.Key ? image.Key : "p" + imageIdx}
                />
              ))}
            </div>
          </div>
        )}
      </>
    </>
  );
};
