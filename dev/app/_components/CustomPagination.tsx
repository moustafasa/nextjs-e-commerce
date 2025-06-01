import Link from "next/link";
import { Fragment } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import cn from "../_utilities/cssConditional";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<
    { page?: string } & Record<string, string | string[] | undefined>
  >;
  getMetaData: Promise<{ totalPages: number }>;
};
export default async function CustomPagination({
  searchParams,
  getMetaData,
}: Props) {
  const params = await searchParams;
  const currentPage = params.page ? +params.page : 1;
  const meta = await getMetaData;
  const totalPages = meta?.totalPages || 0;
  if (currentPage > totalPages && currentPage != 1) {
    return notFound();
  }
  const windowSize = 3;
  const halfWindow = Math.floor(windowSize / 2);
  const items = Array.from({ length: totalPages }, (_, index) => index + 1);
  let start = Math.max(1, currentPage - halfWindow);
  const end = Math.min(totalPages, start + windowSize - 1);
  const remainingItems = windowSize - (end - start + 1);
  if (remainingItems > 0) {
    start = Math.max(1, start - remainingItems);
  }

  const modifiedParams = Object.keys(params)
    .map((key) =>
      Array.isArray(params[key])
        ? `${key}=` + (params[key] as string[]).join(`&${key}=`)
        : `${key}=${params[key]}`
    )
    .join("&");

  const getSearchParams = (page: number) => {
    const newSearchParams = new URLSearchParams(modifiedParams);
    newSearchParams.set("page", page.toString());
    return `?${newSearchParams.toString()}`;
  };

  return (
    <ul className="flex gap-1 justify-center items-center  mt-7 mb-7 capitalize">
      <li>
        <Link
          scroll={false}
          className={cn(
            "px-4 py-2  dark:hover:bg-black-tertiery-bg hover:bg-slate-400 hover:text-white  transition-color duration-300  rounded-md flex items-center gap-2",
            {
              "text-gray-input pointer-events-none": currentPage === 1,
            }
          )}
          href={getSearchParams(Math.max(1, currentPage - 1))}
        >
          <FaChevronLeft /> <span className={"hidden md:inline"}>previous</span>
        </Link>
      </li>
      {items.map((item) => (
        <Fragment key={item}>
          {/*  end ellipse */}
          {item === totalPages && end < totalPages && (
            <li className="px-2 md:px-3 py-1 ">...</li>
          )}

          {/* window */}
          {((item >= start && item <= end) ||
            item === 1 ||
            item === totalPages) && (
            <li>
              <Link
                scroll={false}
                className={cn(
                  "px-2 md:px-3 py-1  dark:hover:bg-black-tertiery-bg hover:bg-slate-400 hover:text-white  transition-color duration-300  rounded-md border-[1.5px] border-transparent",
                  {
                    "border-black-tertiery-bg ": currentPage === item,
                  }
                )}
                href={getSearchParams(item)}
              >
                {item}
              </Link>
            </li>
          )}

          {/* start ellipse */}
          {item === 1 && start > 1 && (
            <li className="px-2 md:px-3 py-1">...</li>
          )}
        </Fragment>
      ))}
      <li>
        <Link
          scroll={false}
          className={cn(
            "px-4 py-2  dark:hover:bg-black-tertiery-bg hover:bg-slate-400 hover:text-white  transition-color duration-300  rounded-md flex items-center gap-2",
            {
              "text-gray-input pointer-events-none": currentPage === totalPages,
            }
          )}
          href={getSearchParams(Math.min(totalPages, currentPage + 1))}
        >
          <span className={"hidden md:inline"}>next</span>
          <FaChevronRight />
        </Link>
      </li>
    </ul>
  );
}

CustomPagination.displayName = "CustomPagination";
