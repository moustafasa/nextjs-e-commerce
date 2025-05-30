import Skeleton from "@/app/_components/skeletons/Skeleton";
import LottieAnimeSk from "../_components/LottieAnimeSk";

export default function loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6">
        <Skeleton classNames="sk-header w-[200px]" />
      </h1>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton classNames="sk-text" />
            <Skeleton classNames="sk-text w-1/2" />
          </div>

          <div className="space-y-2">
            <Skeleton classNames="sk-text" />
            <Skeleton classNames="sk-text w-1/2" />
          </div>

          <div className="mt-6">
            <h2 className=" mb-3 ">
              <Skeleton classNames="sk-header w-[200px]" />
            </h2>
            <ul className="list-disc pl-5 space-y-2 ">
              <li className="w-1/3">
                <Skeleton classNames="sk-text" />
              </li>
              <li className="w-1/3">
                <Skeleton classNames="sk-text" />
              </li>
              <li className="w-1/3">
                <Skeleton classNames="sk-text" />
              </li>
              <li className="w-1/3">
                <Skeleton classNames="sk-text" />
              </li>
              <li className="w-1/3">
                <Skeleton classNames="sk-text" />
              </li>
            </ul>
          </div>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <LottieAnimeSk />
        </div>
      </div>
    </div>
  );
}
