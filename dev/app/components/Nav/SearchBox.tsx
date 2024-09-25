import cn from "@/lib/cssConditional";
import { FaSearch } from "react-icons/fa";

type Props = { isOpen: boolean };
export default function SearchBox({ isOpen }: Props) {
  return (
    <div
      id="collapse"
      className={cn(
        "mt-3 mx-auto relative hidden lg:order-none lg:mt-0 lg:w-auto lg:ps-0  order-3 w-full ps-4 md:block",
        { block: isOpen }
      )}
    >
      <input
        type="text"
        name="search"
        placeholder="type anything to search"
        className=" rounded-full placeholder:text-gray-icons min-w-[250px] capitalize ps-5 pe-9 py-1 bg-move-input focus:outline-none focus:ring-2 focus:ring-blue-links w-full"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
        <FaSearch />
      </button>
    </div>
  );
}
