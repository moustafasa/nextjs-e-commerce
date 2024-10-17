import { useRef, useState } from "react";
import uploadIcon from "@/images/uploadIcon.png";
import Image from "next/image";
import cn from "@/app/_utilities/cssConditional";
import { Props } from "./_Types";

export default function FileInput({
  input,
  defaultValue,
  value,
  onChange,
}: Omit<Props<FileInput>, "errors">) {
  const [fileUrl, setFileUrl] = useState<string | undefined>(
    (defaultValue as string | undefined) || (value as string | undefined)
  );
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setFileHandler = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileUrl(reader.result as string);
      if (onChange) onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <label
      htmlFor={input.id}
      className={cn(
        " cursor-pointer block border-2 w-full h-48 border-gray-icons border-dashed sm:col-span-2 ",
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
        onChange={(e) => {
          if (e.target.files?.[0]) setFileHandler(e.target.files[0]);
        }}
        accept=".png,.jpg,.jpeg"
        className="hidden"
        name={input.name}
        id={input.id}
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
                priority
              />
            ) : (
              <Image
                className="w-20 object-cover"
                src={fileUrl}
                alt="image"
                width={300}
                height={300}
                draggable={false}
                priority
              />
            )}
            <span>
              {fileUrl
                ? fileInputRef.current?.files?.[0]?.name ||
                  `choose or drop ${input.label} image`
                : `choose or drop ${input.label} image`}
            </span>
          </>
        )}
      </div>
    </label>
  );
}
