import Skeleton from "@/app/_components/skeletons/Skeleton";
import cn from "@/app/_utilities/cssConditional";

type Props = { type: string; bgLight?: boolean; noError?: boolean };
export default function FormFieldSkeleton({ type, bgLight, noError }: Props) {
  return (
    <>
      {type === "file" ? (
        <div className="w-full h-48 border-2 border-dashed border-gray-icons sm:col-span-2 flex items-center justify-center flex-col gap-3">
          {/* Skeleton for the upload icon */}
          <Skeleton classNames="sk-circle" />

          {/* Skeleton for the label text */}
          <Skeleton classNames="sk-text w-3/4" />
        </div>
      ) : (
        <>
          <Skeleton
            classNames={`sk-text w-28 mb-1 sm:mb-0  ${
              !!bgLight && "dark:bg-black-secondary-bg"
            }`}
          />
          {type === "textarea" ? (
            <div className="w-full">
              {/* Skeleton for the textarea */}
              <Skeleton
                classNames={`sk-input !w-full !h-24 ${
                  !!bgLight && "dark:bg-black-secondary-bg"
                } `}
              />
            </div>
          ) : (
            <div className="flex gap-3">
              {/* Skeleton for the input field */}
              <Skeleton
                classNames={`sk-input !w-full ${
                  !!bgLight && "dark:bg-black-secondary-bg"
                } `}
              />
            </div>
          )}
        </>
      )}
      {!noError && (
        <div
          className={cn("mb-4 sm:mb-6 h-6 px-3 invisible", {
            "sm:col-start-2 ": type !== "file",
            "sm:col-span-2 mt-1": type === "file",
          })}
        ></div>
      )}
    </>
  );
}
