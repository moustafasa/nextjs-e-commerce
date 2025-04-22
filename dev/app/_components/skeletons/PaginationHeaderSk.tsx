import Skeleton from "./Skeleton";

export default function PaginationHeaderSk() {
  return (
    <h2 className=" mb-5 flex items-center gap-1">
    showing <Skeleton classNames="sk-text w-10 block"/> from <Skeleton classNames="sk-text block w-10"/> results
  </h2>
  )
}
