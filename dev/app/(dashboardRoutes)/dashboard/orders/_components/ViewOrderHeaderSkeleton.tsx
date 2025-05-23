import Skeleton from "../../../../_components/skeletons/Skeleton";

export default function ViewOrderHeaderSkeleton() {
  return (
    <div className="w-full border-[1px] p-3 grid grid-flow-cols grid-cols-[auto_auto_1fr] overflow-auto">
      <div className="grid grid-cols-subgrid col-span-3 items-center">
        <span className="sm:p-3 p-2 whitespace-nowrap ">order id </span>
        <span className="sm:p-3 p-2"> : </span>
        <span className="sm:p-3 p-2 ">
          <Skeleton classNames="sk-text" />
        </span>
      </div>
      <div className="grid grid-cols-subgrid col-span-3 items-center">
        <span className="sm:p-3 p-2 whitespace-nowrap ">order owner </span>
        <span className="sm:p-3 p-2"> : </span>
        <span className="sm:p-3 p-2 ">
          <Skeleton classNames="sk-text" />
        </span>
      </div>
      <div className="grid grid-cols-subgrid col-span-3 items-center">
        <span className="sm:p-3 p-2 whitespace-nowrap ">total price </span>
        <span className="sm:p-3 p-2"> : </span>
        <span className="sm:p-3 p-2 ">
          <Skeleton classNames="sk-text" />
        </span>
      </div>
      <div className="grid grid-cols-subgrid col-span-3 items-center">
        <span className="sm:p-3 p-2 whitespace-nowrap ">status </span>
        <span className="sm:p-3 p-2"> : </span>
        <div className="p-3">
          <div className="flex gap-2 justify-start items-center sm:justify-center">
            <div className="sm:w-[40%] w-full min-w-[120px]">
              <Skeleton classNames="sk-input !w-full" />
            </div>
            <Skeleton classNames="sk-button justify-self-end" />
          </div>
        </div>
      </div>
    </div>
  );
}
