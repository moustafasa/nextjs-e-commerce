import Skeleton from "@/app/_components/skeletons/Skeleton";

type Props = {
  maxWidth?: string;
  children?: React.ReactNode;
};

export default function FormLayoutSkeleton({
  maxWidth = "700px",
  children,
}: Props) {
  return (
    <div className="px-3">
      <div
        className=" bg-black-secondary-bg mt-20 mx-auto py-10 px-14 rounded-lg shadow-lg"
        style={{ maxWidth }}
      >
        <Skeleton classNames="sk-header w-1/3 mb-6 mx-auto" />
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center">
            {children}
            <div className="sm:col-span-2 mx-10 mt-6 sm:mt-2">
              <Skeleton classNames="sk-button  mx-auto !w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
