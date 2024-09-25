import { lazy, Suspense } from "react";
// import LottieAnime from "../components/Home/LottieAnime";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const LottieAnime = lazy(() => import("../components/Home/LottieAnime"));

export default function Home() {
  return (
    <div className="text-white flex gap-3 items-center mt-32 lg:mt-20  container mx-auto  justify-center">
      <div className="max-w-[600px] w-[45%]">
        <h1 className="text-4xl font-bold capitalize mb-8">
          welcome to moustafa clothes shopping
        </h1>
        <p className="text-balance leading-relaxed text-gray-icons text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit magna interdum eu. Curabitur pellentesque nibh nibh,
        </p>
        <Link
          href={"/shop-now"}
          className="flex items-center gap-3 mt-10 text-3xl ms-20"
        >
          Shop Now <FaArrowRight />
        </Link>
      </div>
      <div className="w-[45%]">
        <Suspense fallback={<div>loading</div>}>
          <LottieAnime />
        </Suspense>
      </div>
    </div>
  );
}
