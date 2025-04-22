import Pagination from "@/app/_components/Pagination";
import { ShopNowSearchParams } from "@/app/_components/shop-now/_Types";
import CategorySideNav from "@/app/_components/shop-now/CategorySideNav";
import PaginationHeader from "@/app/_components/shop-now/PaginationHeader";
import ProductsList from "@/app/_components/shop-now/ProductsList";
import PaginationHeaderSk from "@/app/_components/skeletons/PaginationHeaderSk";
import PaginationSk from "@/app/_components/skeletons/PaginationSk";
import ProductListSk from "@/app/_components/skeletons/ProductListSk";
import ShopNowSideNavSk from "@/app/_components/skeletons/ShopNowSideNavSk";
import { Suspense } from "react";

export default async function page({ searchParams }: ShopNowSearchParams) {
  return (
    <div className="md:ps-shop-now-side-nav-w">
      <Suspense fallback={<ShopNowSideNavSk />}>
        <CategorySideNav />
      </Suspense>
      <div className="md:p-10 p-3  text-white">
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
      </div>
      <Suspense fallback={<PaginationSk />}>
        <Pagination searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
