"use client";
import {
  ChangeEvent,
  DragEvent,
  forwardRef,
  startTransition,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import uploadIcon from "@/images/uploadIcon.png";
import Image from "next/image";
import cn from "@/app/_utilities/cssConditional";
import { Props } from "./_Types";

export default forwardRef<HTMLInputElement, Omit<Props<FileInput>, "errors">>(
  function FileInput({ input, defaultValue, onChange, disabled }, ref) {
    const [filesUrl, setFilesUrl] = useState<string | undefined>(
      defaultValue || undefined
    );

    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => fileInputRef.current!, [fileInputRef]);

    const setFilesHandler = (files: FileList) => {
      if (!input.multible)
        startTransition(() => {
          setFilesUrl(URL.createObjectURL(files?.[0]));
        });
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      if (!disabled) {
        setFilesHandler(e.dataTransfer.files);
        if (fileInputRef.current) {
          fileInputRef.current.files = e.dataTransfer.files;
        }
      }
      setDragging(false);
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      if (disabled) {
        e.dataTransfer.dropEffect = "none";
      }
      setDragging(true);
    };

    const handleDragLeave = () => {
      setDragging(false);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) setFilesHandler(e.target.files);
      if (onChange) onChange(e);
    };

    return (
      <>
        <label
          htmlFor={input.id}
          className={cn(
            " cursor-pointer block border-2 w-full h-48 border-gray-icons border-dashed sm:col-span-2 p-3 text-center",
            {
              "border-solid bg-gray-icons/40": dragging && !disabled,
              "border-black-tertiery-bg ": disabled,
              "cursor-not-allowed": disabled && dragging,
            }
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            onChange={handleOnChange}
            accept=".png,.jpg,.jpeg"
            className="hidden"
            name={input.name}
            id={input.id}
            ref={fileInputRef}
            multiple={input.multible}
            disabled={disabled}
          />
          <div
            className={cn(
              "w-full h-full flex items-center justify-center flex-col gap-3 cursor-cell",
              {
                "cursor-default": disabled,
                "cursor-no-drop": disabled && dragging,
              }
            )}
          >
            {dragging && !disabled ? (
              <div>drop here</div>
            ) : (
              <>
                {filesUrl ? (
                  <Image
                    className="w-20 object-cover"
                    src={filesUrl}
                    alt="image"
                    width={300}
                    height={300}
                    draggable={false}
                    priority
                  />
                ) : (
                  <Image
                    draggable={false}
                    src={uploadIcon}
                    alt="upload icon"
                    className={cn("w-20", { " grayscale": disabled })}
                    priority
                  />
                )}
                <span className={cn({ "text-black-tertiery-bg": disabled })}>
                  {filesUrl
                    ? fileInputRef.current?.files?.[0]?.name ||
                      `choose or drop ${input.label} image`
                    : `choose or drop ${input.label} image`}
                </span>
              </>
            )}
          </div>
        </label>
      </>
    );
  }
);
