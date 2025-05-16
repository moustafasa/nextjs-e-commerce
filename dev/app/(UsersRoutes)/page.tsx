/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy, Suspense } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import LottieAnimeSk from "./_components/LottieAnimeSk";

const LottieAnime = lazy(() => import("./_components/HomePageAnime"));

export default function Home() {
  return <div></div>;
  // return (
  //   <div className="flex-col-reverse lg:flex-row px-7 dark:text-white text-black-bg flex gap-3 items-center mt-3  container mx-auto  justify-center lg:px-7">
  //     <div className="lg:max-w-[600px] lg:w-[45%] text-center lg:text-left">
  //       <h1 className="text-4xl font-bold capitalize mb-8">
  //         welcome to moustafa clothes shopping
  //       </h1>
  //       <p className="text-balance leading-relaxed dark:text-gray-icons  text-lg">
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
  //         mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
  //         mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
  //         tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
  //         suscipit magna interdum eu. Curabitur pellentesque nibh nibh,
  //       </p>
  //       <Link
  //         href={"/shop-now"}
  //         className="flex items-center justify-center lg:justify-start gap-3 mt-10 text-3xl lg:ms-20"
  //       >
  //         Shop Now <FaArrowRight />
  //       </Link>
  //     </div>
  //     <div className="lg:w-[45%] flex justify-center items-center">
  //       {/* <LottieAnimeSk /> */}
  //       <Suspense fallback={<LottieAnimeSk />}>
  //         <LottieAnime />
  //       </Suspense>
  //     </div>
  //   </div>
  // );
}
