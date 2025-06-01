import { FaLock } from "react-icons/fa";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <div className="text-6xl text-red-500">
        <FaLock />
      </div>
      <h1 className="text-4xl font-bold text-center">Unauthorized Access</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-md">
        Sorry, you don&apos;t have permission to access this page. Please sign
        in with appropriate credentials.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 transition-opacity capitalize"
      >
        go home
      </Link>
    </div>
  );
}
