import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Skeleton from "./Skeleton";

type Props = {
  addBtn?: boolean;
  children: ReactNode;
  className?: string;
  headerNum?: number;
};

export default function TableLayoutSk({
  addBtn,
  children,
  className,
  headerNum,
}: Props) {
  return (
    <div className="w-full px-5 pt-10 pb-3">
      <header className="flex justify-around items-center  mb-10">
        <h2>
          <Skeleton classNames="sk-header w-48" />
        </h2>
        {addBtn && <Skeleton classNames="sk-button" />}
      </header>
      <div className="w-full overflow-auto ">
        <table className={cn("w-full whitespace-nowrap", className)}>
          <thead>
            <tr>
              {Array(headerNum)
                .fill(0)
                .map((_, index) => (
                  <th
                    key={index}
                    className="p-3 bg-black-nav  first-of-type:rounded-ss-lg first-of-type:rounded-es-lg last-of-type:rounded-se-lg last-of-type:rounded-ee-lg"
                  >
                    <Skeleton classNames="sk-header" />
                  </th>
                ))}
            </tr>
          </thead>
          {children}
        </table>
      </div>
    </div>
  );
}
