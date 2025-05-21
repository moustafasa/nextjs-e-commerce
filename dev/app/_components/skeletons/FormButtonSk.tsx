import Skeleton from "./Skeleton";

type Props = { bgLight?: boolean };
export default function FormButtonSk({ bgLight }: Props) {
  return (
    <div className="sm:col-span-2 w-[calc(100%-2.5rem)] mx-auto mt-6 sm:mt-2">
      <Skeleton
        classNames={`sk-button  mx-auto !w-full ${
          !!bgLight && "!bg-black-secondary-bg"
        }`}
      />
    </div>
  );
}
