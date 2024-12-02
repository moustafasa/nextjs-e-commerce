import useImagesUrls from "@/app/_utilities/addProductContext/useImagesUrls";
import useProductIdContext from "@/app/_utilities/addProductContext/useProductIdContext";
import { upload } from "@vercel/blob/client";
import Image from "next/image";
import { memo, startTransition, useEffect, useRef, useState } from "react";

type Props = { file: File; deleteMethod: () => void };
function FileInputShowItem({ file, deleteMethod }: Props) {
  const url = useRef(URL.createObjectURL(file));
  const signal = useRef(new AbortController());
  const id = useProductIdContext();
  const [progress, setProgress] = useState(0);
  const [, setImagesUrls] = useImagesUrls();
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(isLoaded, "is loaded ", file.name);

  useEffect(() => {
    const uploadImg = async () => {
      if (!isLoaded) {
        setIsLoaded(true);
        const newBlob = await upload(
          `/products/draft-${id}/${file.name}`,
          file,
          {
            access: "public",
            handleUploadUrl: "/api/uploadProductImg", // This should be your API route for handling uploads
            onUploadProgress: async ({ loaded, total }) => {
              startTransition(() => {
                if (total) setProgress(Math.floor((loaded * 100) / total));
              });
            },
            abortSignal: signal.current.signal,
          }
        );
        setImagesUrls((prev) => [...prev, newBlob.url]);
      }
    };
    uploadImg();
  }, [file, id, isLoaded, setImagesUrls]);

  return (
    <li className="relative ">
      <div className="relative h-full ">
        <Image
          className="object-cover h-full rounded-lg"
          src={url.current}
          alt="image"
          width={300}
          height={300}
          draggable={false}
          priority
        />
        <button
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-error rounded-full w-7 h-7 grid place-items-center leading-7 uppercase"
          type="button"
          onClick={() => {
            if (signal.current.signal.aborted) {
              // delete image draft from vercel blob
            } else {
              signal.current.abort();
            }
            setImagesUrls((prev) =>
              prev.filter((prevImg) => prevImg !== url.current)
            );
            deleteMethod();
          }}
        >
          x
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-white rounded-lg ">
        <div
          className="absolute bg-green-600 transition-all duration-300 h-full rounded-lg left-0 top-0"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </li>
  );
}

export default memo(
  FileInputShowItem,
  (prev, next) => prev.file.name === next.file.name
);
