import useDeletedImagesUrls from "@/app/context/addProductContext/useDeletedImagesUrls";
import Image from "next/image";
import { useCallback } from "react";

type Props = { img: string };
export default function RemoteImagesShowItem({ img }: Props) {
  const [, setDeletedImages] = useDeletedImagesUrls();

  const deleteImg = useCallback(() => {
    setDeletedImages((prev) => [...prev, img]);
  }, [img, setDeletedImages]);

  return (
    <li className="relative ">
      <div className="relative h-full ">
        <Image
          className="object-cover h-full rounded-lg"
          src={img}
          alt="image"
          width={300}
          height={300}
          draggable={false}
          priority
        />
        <button
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-error rounded-full w-7 h-7 grid place-items-center leading-7 uppercase"
          type="button"
          onClick={async () => {
            deleteImg();
          }}
        >
          x
        </button>
      </div>
    </li>
  );
}
