import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center text-blue-links">
      <Image src={logo} alt="logo" className="w-[80px] " priority />
      <span className="-m-3 font-bold hidden sm:block">by moustafa saad</span>
    </Link>
  );
}
