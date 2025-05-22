import PaginationHeaderSk from "@/app/_components/skeletons/PaginationHeaderSk";
import ProductListSk from "@/app/_components/skeletons/ProductListSk";
import { Suspense } from "react";
import { ShopNowSearchParams } from "./_types/_Types";
import CategorySideNav from "./_components/CategorySideNav";
import PaginationHeader from "./_components/PaginationHeader";
import ProductsList from "./_components/ProductsList";
import CustomPagination from "@/app/_components/CustomPagination";
import { getProductsWithCategoryTotal } from "@/lib/productsControllers";
import CategorySideNavSk from "@/app/_components/skeletons/CategorySideNavSk";

export default async function page({ searchParams }: ShopNowSearchParams) {
  const params = await searchParams;
  return (
    <div className="md:ps-shop-now-side-nav-w min-h-full">
      <Suspense fallback={<CategorySideNavSk />}>
        <CategorySideNav />
      </Suspense>
      <div className="md:p-10 p-3">
        <Suspense fallback={<PaginationHeaderSk />}>
          <PaginationHeader searchParams={searchParams} />
        </Suspense>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
          <Suspense
            key={JSON.stringify(await searchParams)}
            fallback={<ProductListSk />}
          >
            <ProductsList searchParams={searchParams} />
          </Suspense>
        </ul>

        <CustomPagination
          searchParams={searchParams}
          getMetaData={getProductsWithCategoryTotal(
            params?.category,
            params?.search
          )}
        />
      </div>
    </div>
  );
}
