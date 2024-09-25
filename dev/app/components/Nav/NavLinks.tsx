import cn from "@/lib/cssConditional";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { isOpen: boolean };

export default function NavLinks({ isOpen }: Props) {
  const pathname = usePathname();
  return (
    <nav
      id="collapse"
      className={cn(
        "gap-3 ms-9 order-4 md:flex md:order-none md:flex-row md:py-0 flex-col py-3 hidden",
        { flex: isOpen }
      )}
    >
      <Link href={"/"}>
        <span
          className={cn(
            "transition-colors duration-300 hover:text-gray-icons relative before:absolute md:before:w-[60%] before:w-[70%] before:bg-gray-icons before:h-[1px] before:bottom-0 md:before:left-[20%] before:origin-left md:before:origin-center before:transition-transform before:scale-x-0 hover:before:scale-x-100 ",
            { "before:scale-x-100 text-gray-icons": pathname === "/" }
          )}
        >
          home
        </span>
      </Link>
      <Link href={"/shop-now"}>
        <span
          className={cn(
            "transition-colors duration-300 hover:text-gray-icons relative before:absolute md:before:w-[60%] before:w-[70%] before:bg-gray-icons before:h-[1px] before:bottom-0 md:before:left-[20%] before:origin-left md:before:origin-center before:transition-transform before:scale-x-0 hover:before:scale-x-100 ",
            { "before:scale-x-100 text-gray-icons": pathname === "/shop-now" }
          )}
        >
          shop now
        </span>
      </Link>
      <Link href={"/about"}>
        <span
          className={cn(
            "transition-colors duration-300 hover:text-gray-icons relative before:absolute md:before:w-[60%] before:w-[70%] before:bg-gray-icons before:h-[1px] before:bottom-0 md:before:left-[20%] before:origin-left md:before:origin-center before:transition-transform before:scale-x-0 hover:before:scale-x-100 ",
            { "before:scale-x-100 text-gray-icons": pathname === "/about" }
          )}
        >
          about
        </span>
      </Link>
      <Link href={"/contact"}>
        <span
          className={cn(
            "transition-colors duration-300 hover:text-gray-icons relative before:absolute md:before:w-[60%] before:w-[70%] before:bg-gray-icons before:h-[1px] before:bottom-0 md:before:left-[20%] before:origin-left md:before:origin-center before:transition-transform before:scale-x-0 hover:before:scale-x-100 ",
            { "before:scale-x-100 text-gray-icons": pathname === "/contact" }
          )}
        >
          contact
        </span>
      </Link>
    </nav>
  );
}
