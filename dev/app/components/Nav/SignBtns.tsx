import Link from "next/link";

export default function SignBtns() {
  return (
    <div className="flex gap-4 whitespace-nowrap">
      <Link href="/sign-in" className="form-button ">
        sign in
      </Link>
      <Link
        href="/sign-up"
        className="form-button transition-colors duration-300 hover:bg-blue-button-hover"
      >
        sign up
      </Link>
    </div>
  );
}
