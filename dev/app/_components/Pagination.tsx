import { getProductsWithCategoryTotal } from "@/lib/productsControllers";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ page?: number; category?: string | string[] }>;
};
export default async function Pagination({ searchParams }: Props) {
  const params = await searchParams;

  const pageParam = params.page || 1;

  const productsMeta = await getProductsWithCategoryTotal(params.category);

  const categoryParam = !!params.category
    ? typeof params.category === "string"
      ? "category=" + params.category
      : params.category.map((cat) => `category=${cat}`).join("&")
    : "";

  const previousSearchParams = new URLSearchParams(
    `page=${pageParam}${categoryParam.length > 0 ? `&${categoryParam}` : ""}`
  );
  previousSearchParams.set("page", `${Math.max(+pageParam - 1, 1)}`);
  const nextSearchParams = new URLSearchParams(
    `page=${pageParam}${categoryParam.length > 0 ? `&${categoryParam}` : ""}`
  );
  nextSearchParams.set(
    "page",
    `${Math.min(+pageParam + 1, productsMeta.totalPages)}`
  );

  return (
    <div className="text-white flex items-center justify-center gap-3">
      <Link
        href={`?${previousSearchParams.toString()}`}
        scroll={false}
        className="form-button"
      >
        previous
      </Link>
      <Link
        href={`?${nextSearchParams.toString()}`}
        scroll={false}
        className="form-button"
      >
        next
      </Link>
    </div>
  );
}
