import Skeleton from "@/app/_components/skeletons/Skeleton";

export default function _CartProductShowSk() {
  return (
    <div className="flex gap-3 py-4 ps-5 w-max">
      <div className="p-3 rounded-lg shadow-lg flex-shrink-0">
        <Skeleton classNames="sk-image !h-[150px] !w-[150px] flex-shrink-0" />
      </div>
      <div className="flex flex-col items-start  gap-5 flex-shrink-0">
        <div className="flex flex-col items-start flex-shrink-0 gap-1 ">
          <Skeleton classNames="sk-text w-20" />
          <Skeleton classNames="sk-header w-40" />
        </div>
        <Skeleton classNames="sk-text w-52" />
      </div>
    </div>
  );
}
