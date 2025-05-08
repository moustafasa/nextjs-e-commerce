import { getProductsWithCategoryTotal } from "@/lib/productsControllers";
import { ShopNowSearchParams } from "../_types/_Types";

export default async function PaginationHeader({
  searchParams,
}: ShopNowSearchParams) {
  const params = await searchParams;
  const { totalProducts, limit } = await getProductsWithCategoryTotal(
    params.category,
    params.search
  );

  const from = ((params?.page ? +params.page : 1) - 1) * limit + 1;
  const to = Math.min(limit * (params?.page ? +params.page : 1), totalProducts);
  return (
    <h2 className="capitalize mb-5">
      showing {from}
      {from !== to ? `-${to}` : ""} from {totalProducts} results
    </h2>
  );
}
