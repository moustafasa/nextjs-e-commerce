"use client";
import { useRouter } from "next/navigation";

export default function NotFoundComp() {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold">404 Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.back()}
        role="link"
        className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 transition-opacity capitalize"
      >
        go back
      </button>
    </div>
  );
}
