"use client";
import { ICategories } from "@/models/database/Categories";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FaCheck } from "react-icons/fa";

type Props = { category: ICategories };
export default function CategoryFilterITem({ category }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = useMemo(
    () => searchParams.get("category")?.split(",") || [],
    [searchParams]
  );

  useEffect(() => {
    router.prefetch(`/shop-now?category=${categoryParam}`);
  }, [categoryParam, router]);

  return (
    <li className="capitalize">
      <label
        className="p-2 flex rounded-lg gap-3 items-center max-md:justify-center cursor-pointer max-md:has-[:checked]:bg-blue-button max-md:border-gray-input max-md:border transition-color duration-400  text-nowrap"
        htmlFor={`${category._id.toString()}`}
      >
        <div className="relative hidden md:block ">
          <input
            type="checkbox"
            id={`${category._id.toString()}`}
            className="peer block appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-button checked:border-transparent focus:outline-none"
            onChange={(e) => {
              if (e.target.checked) {
                if (!categoryParam.includes(category._id.toString())) {
                  categoryParam.push(category._id.toString());
                }
              } else {
                if (categoryParam.includes(category._id.toString())) {
                  categoryParam.splice(
                    categoryParam.indexOf(category._id.toString()),
                    1
                  );
                }
              }
              router.replace(
                `${
                  categoryParam.length > 0 ? `?category=${categoryParam}` : "?"
                }`
              );
            }}
            checked={categoryParam.includes(category._id.toString())}
          />
          <FaCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:block hidden text-white" />
        </div>
        {category.title}
      </label>
    </li>
  );
}
