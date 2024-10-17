import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  tableName: string;
  addBtn: {
    label: string;
    Icon: ReactNode;
    href: string;
  };
  children: ReactNode;
};

export default function TableLayout({ tableName, addBtn, children }: Props) {
  return (
    <div className="w-full px-5 pt-20">
      <header className="flex justify-around items-center  mb-10">
        <h2 className="capitalize text-4xl font-bold relative before:absolute before:h-[1px] before:w-[60%] before:bg-white before:bottom-[-8px] before:left-[20%]">
          {tableName}
        </h2>
        <Link
          href={addBtn.href}
          className="form-button flex items-center gap-2"
        >
          {addBtn.Icon} {addBtn.label}
        </Link>
      </header>
      <div className="w-full overflow-auto ">
        <table className="w-full text-center capitalize whitespace-nowrap ">
          {children}
        </table>
      </div>
    </div>
  );
}
