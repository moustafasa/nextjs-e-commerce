import cn from "@/app/_utilities/cssConditional";

type Props = { title: string; className?: string };
export default function PageHeader({ title, className }: Props) {
  return (
    <h2 className={cn(" capitalize font-bold text-center ", className)}>
      <span className="relative before:absolute before:w-[60%] before:h-[1px] before:bg-black-bg dark:before:bg-white before:bottom-0 before:left-[20%] ">
        {title}
      </span>
    </h2>
  );
}
