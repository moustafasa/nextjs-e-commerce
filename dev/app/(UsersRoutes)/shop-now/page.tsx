import CategorySideNav from "@/app/_components/shop-now/CategorySideNav";
import ProductsList from "@/app/_components/shop-now/ProductsList";
import { Suspense } from "react";

type Props = { searchParams: Promise<{ category?: string[] }> };

export default async function page({ searchParams }: Props) {
  return (
    <div className="md:ps-shop-now-side-nav-w">
      <Suspense fallback={<div>Loading...</div>}>
        <CategorySideNav />
      </Suspense>
      <div className="md:p-10 p-3  text-white">
        <h2 className="capitalize mb-5">showing 1-9 from 46 results</h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
          <Suspense fallback={<div>Loading..</div>}>
            <ProductsList searchParams={searchParams} />
          </Suspense>
        </ul>
      </div>
    </div>
  );
}
