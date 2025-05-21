import cn from "@/app/_utilities/cssConditional";
import Link from "next/link";
import { ReactNode } from "react";
import SearchBox from "../Nav/SearchBox";
import PageHeader from "../PageHeader";

type Props = {
  tableName: string;
  addBtn?: {
    label: string;
    Icon: ReactNode;
    href: string;
  };
  children: ReactNode;
  className?: string;
  noSearch?: boolean;
};

export default function TableLayout({
  tableName,
  addBtn,
  children,
  className,
  noSearch,
}: Props) {
  return (
    <div className="w-full px-5 pt-10 pb-3">
      <header className="flex justify-around items-center gap-3 mb-10 flex-wrap">
        <PageHeader
          title={tableName}
          className="text-4xl [&>span]:before:bottom-1 "
        />

        {!noSearch && <SearchBox isOpen />}
        {addBtn && (
          <Link
            href={addBtn.href}
            className="form-button flex items-center gap-2"
          >
            {addBtn.Icon} {addBtn.label}
          </Link>
        )}
      </header>
      <div className="w-full overflow-auto ">
        <table
          className={cn(
            "w-full text-center capitalize whitespace-nowrap",
            className
          )}
        >
          {children}
        </table>
      </div>
    </div>
  );
}
