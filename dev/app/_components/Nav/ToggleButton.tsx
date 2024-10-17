import cn from "@/app/_utilities/cssConditional";

type Props = { dark: boolean };

export default function ToggleButton({ dark }: Props) {
  return (
    <div
      className={cn(
        "w-9 h-6 border-2 rounded-full relative border-gray-icons transition-all duration-1000 ",
        { "bg-gray-icons": dark }
      )}
    >
      <div
        className={cn(
          " absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-gray-icons transition-all duration-1000",
          { "bg-black-nav left-auto right-[2px]": dark }
        )}
      ></div>
    </div>
  );
}
