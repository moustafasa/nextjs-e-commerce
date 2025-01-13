"use client";
import cn from "@/app/_utilities/cssConditional";
import { ICategories } from "@/models/database/Categories";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useOptimistic } from "react";
import { FaCheck } from "react-icons/fa";

type Props = { category: ICategories };
export default function CategoryFilterITem({ category }: Props) {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const [checked, setChecked] = useOptimistic(
    newSearchParams.has("category", category._id.toString())
  );

  const router = useRouter();

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
            className={cn(
              "peer block appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-button checked:border-transparent focus:outline-none",
              {
                "checked:bg-blue-button-disabled":
                  checked &&
                  !newSearchParams.has("category", category._id.toString()),
              }
            )}
            name="category"
            checked={checked}
            onChange={(e) => {
              startTransition(() => {
                if (e.currentTarget.checked) {
                  setChecked(true);
                  newSearchParams.append("category", category._id.toString());
                  router.push(`?${newSearchParams.toString()}`);
                } else {
                  setChecked(false);
                  newSearchParams.delete("category", category._id.toString());
                  router.push(`?${newSearchParams.toString()}`);
                }
              });
            }}
          />
          <FaCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:block hidden text-white" />
        </div>
        {category.title}
      </label>
    </li>
  );
}
