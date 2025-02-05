import Pagination from "@/app/_components/Pagination";
import { ShopNowSearchParams } from "@/app/_components/shop-now/_Types";
import CategorySideNav from "@/app/_components/shop-now/CategorySideNav";
import PaginationHeader from "@/app/_components/shop-now/PaginationHeader";
import ProductsList from "@/app/_components/shop-now/ProductsList";
import { Suspense } from "react";

export default async function page({ searchParams }: ShopNowSearchParams) {
  return (
    <div className="md:ps-shop-now-side-nav-w">
      <Suspense fallback={<div>Loading...</div>}>
        <CategorySideNav />
      </Suspense>
      <div className="md:p-10 p-3  text-white">
        <PaginationHeader searchParams={searchParams} />
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
          <Suspense fallback={<div>Loading..</div>}>
            <ProductsList searchParams={searchParams} />
          </Suspense>
        </ul>
      </div>
      <Pagination searchParams={searchParams} />
    </div>
  );
}
