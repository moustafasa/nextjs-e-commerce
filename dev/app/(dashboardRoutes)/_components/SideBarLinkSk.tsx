import Skeleton from "@/app/_components/skeletons/Skeleton";

export default function SideBarLinkSk() {
  return Array(8)
    .fill(0)
    .map((_, ind) => (
      <div
        key={ind}
        className=" flex items-center gap-2 py-2 px-4 rounded-lg w-full "
      >
        <Skeleton classNames="sk-icon flex-shrink-0" />
        <Skeleton classNames="sk-text w-full" />
      </div>
    ));
}
