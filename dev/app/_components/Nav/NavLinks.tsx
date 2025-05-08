import cn from "@/app/_utilities/cssConditional";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { isOpen: boolean };

export default function NavLinks({ isOpen }: Props) {
  const pathname = usePathname();
  return (
    <nav
      id="collapse"
      className={cn(
        "gap-3 md:ms-9 order-4 md:flex md:order-none flex-row md:py-0  py-3 hidden  w-full md:w-auto max-md:pb-7 max-md:justify-center max-md:px-3 bg-white dark:bg-transparent shadow-lg dark:shadow-none md:shadow-none",
        { flex: isOpen }
      )}
    >
      <Link href={"/"}>
        <span
          className={cn(
            "transition-colors duration-300 dark:hover:text-gray-icons hover:text-blue-button relative before:absolute before:w-[60%] dark:before:bg-gray-icons before:bg-blue-button before:h-[1px] before:bottom-0 before:left-[20%] before:origin-center before:transition-transform before:scale-x-0 hover:before:scale-x-100 ",
            {
              "before:scale-x-100 text-blue-button font-bold before:h-[2px] dark:text-gray-icons":
                pathname === "/",
            }
          )}
        >
          home
        </span>
      </Link>
      <Link href={"/shop-now"}>
        <span
          className={cn(
            "transition-colors duration-300 dark:hover:text-gray-icons hover:text-blue-button relative before:absolute before:w-[60%] dark:before:bg-gray-icons before:bg-blue-button before:h-[1px] before:bottom-0 before:left-[20%] before:origin-center before:transition-transform before:scale-x-0 hover:before:scale-x-100 ",
            {
              "before:scale-x-100 text-blue-button font-bold before:h-[2px] dark:text-gray-icons":
                pathname === "/shop-now",
            }
          )}
        >
          shop now
        </span>
      </Link>
      <Link href={"/about"}>
        <span
          className={cn(
            "transition-colors duration-300 dark:hover:text-gray-icons hover:text-blue-button relative before:absolute before:w-[60%] dark:before:bg-gray-icons before:bg-blue-button before:h-[1px] before:bottom-0 before:left-[20%] before:origin-center before:transition-transform before:scale-x-0 hover:before:scale-x-100 ",
            {
              "before:scale-x-100 text-blue-button font-bold before:h-[2px] dark:text-gray-icons":
                pathname === "/about",
            }
          )}
        >
          about
        </span>
      </Link>
      <Link href={"/contact"}>
        <span
          className={cn(
            "transition-colors duration-300 dark:hover:text-gray-icons hover:text-blue-button relative before:absolute before:w-[60%] dark:before:bg-gray-icons before:bg-blue-button before:h-[1px] before:bottom-0 before:left-[20%] before:origin-center before:transition-transform before:scale-x-0 hover:before:scale-x-100 ",
            {
              "before:scale-x-100 text-blue-button font-bold before:h-[2px] dark:text-gray-icons":
                pathname === "/contact",
            }
          )}
        >
          contact
        </span>
      </Link>
    </nav>
  );
}
