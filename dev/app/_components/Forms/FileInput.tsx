import { useRef, useState } from "react";
import uploadIcon from "@/images/uploadIcon.png";
import Image from "next/image";
import cn from "@/lib/cssConditional";

type Props = {
  errors: string[] | undefined;
};

export default function FileInput({ errors }: Props) {
  const [fileUrl, setFileUrl] = useState<string>();
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setFileHandler = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label
        htmlFor="file"
        className={cn(
          " cursor-pointer block border-2 w-full h-48 border-gray-icons border-dashed",
          { "border-solid bg-gray-icons/40": dragging }
        )}
        onDrop={(e) => {
          e.preventDefault();
          setFileHandler(e.dataTransfer.files?.[0]);
          if (fileInputRef.current) {
            fileInputRef.current.files = e.dataTransfer.files;
          }
          setDragging(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => {
          setDragging(false);
        }}
      >
        <input
          type="file"
          onChange={(e) =>
            e.target.files?.[0] && setFileHandler(e.target.files[0])
          }
          accept=".png,.jpg,.jpeg"
          className="hidden"
          name="image"
          id="file"
          ref={fileInputRef}
        />
        <div className="w-full h-full flex items-center justify-center flex-col gap-3 cursor-cell">
          {dragging ? (
            <div>drop here</div>
          ) : (
            <>
              {!fileUrl ? (
                <Image
                  draggable={false}
                  src={uploadIcon}
                  alt="upload icon"
                  className="w-20"
                />
              ) : (
                <Image
                  className="w-20 object-cover"
                  src={fileUrl}
                  alt="test"
                  width={300}
                  height={300}
                  draggable={false}
                />
              )}
              <span>
                {fileUrl ? "change profile image" : "drop profile image"}
              </span>
            </>
          )}
        </div>
      </label>

      <div
        title={errors?.[0]}
        className="text-sm px-3 empty:invisible  overflow-hidden text-ellipsis whitespace-nowrap text-red-error"
      >
        {errors?.[0] || null}
      </div>
    </div>
  );
}
