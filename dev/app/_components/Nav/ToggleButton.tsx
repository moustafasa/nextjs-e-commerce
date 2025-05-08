import cn from "@/app/_utilities/cssConditional";

export default function ToggleButton() {
  return (
    <div
      className={cn(
        "w-9 h-6 border-2 rounded-full relative dark:border-gray-icons border-black-bg transition-all duration-1000 bg-white dark:bg-gray-icons"
      )}
    >
      <span
        className={cn(
          " absolute top-[2px] left-[2px] w-4 h-4 rounded-full  bg-black-bg transition-all duration-1000 dark:bg-black-nav dark:left-auto dark:right-[2px]"
        )}
      ></span>
    </div>
  );
}
