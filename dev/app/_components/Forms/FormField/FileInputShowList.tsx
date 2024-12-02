import React, { startTransition, useEffect, useState } from "react";
import FileInputShowItem from "./FileInputShowItem";
import { upload } from "@vercel/blob/client";
import useProductIdContext from "@/app/_utilities/addProductContext/useProductIdContext";

type Props = { files: File[] };
type FileObj = {
  file: File;
  url: string;
  progress: number;
  status: "idle" | "loading" | "done";
};
export default function FileInputShowList({ files }: Props) {
  const [filesObj, setFilesObj] = useState<FileObj[]>([]);

  const id = useProductIdContext();

  useEffect(() => {
    setFilesObj(
      files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        progress: 0,
        status: "idle",
      }))
    );
  }, [files]);

  console.log(filesObj);

  useEffect(() => {
    const uploadFun = async () => {
      const uploadPromises = filesObj
        .filter((file) => file.status === "idle")
        .map(({ file }, ind) => {
          const res = upload(`/products/draft-${id}/${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/api/uploadProductImg", // This should be your API route for handling uploads
            onUploadProgress: async ({ loaded, total }) => {
              startTransition(() => {
                if (total)
                  setFilesObj((prev) => {
                    prev[ind].status = "loading";
                    prev[ind].progress = Math.floor((loaded * 100) / total);
                    return prev;
                  });
              });
            },
            //   abortSignal: signal.current.signal,
          }).then(() => {
            setFilesObj((prev) => {
              prev[ind].status = "done";
              return prev;
            });
          });
          return res;
        });

      await Promise.all(uploadPromises);
    };
    uploadFun();
  }, [filesObj, id]);

  return (
    <ul className=" sm:col-span-2 mb-6 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-8">
      {filesObj.map((file) => (
        <FileInputShowItem key={file.url} file={file} />
      ))}
    </ul>
  );
}
