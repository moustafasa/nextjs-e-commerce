import Skeleton from "./Skeleton";

export default function CategorySideNavSk() {
  return (
    <div className="text-white md:fixed md:top-nav-h dark:md:bg-black-nav md:w-shop-now-side-nav-w md:left-0 md:h-full z-30">
      <h2 className="text-2xl font-bold capitalize mt-7 mb-2 md:ps-2 ps-3">
        categories
      </h2>
      <ul className="ps-5 flex md:flex-col md:gap-2 max-md:flex-wrap max-md:gap-4">
        {Array(3)
          .fill(0)
          .map((_, category) => (
            <li className="capitalize" key={category}>
              <div className="p-2 pe-3 flex rounded-lg gap-3 items-center max-md:justify-center w-full">
                <Skeleton classNames="sk-check-box max-md:hidden" />
                <Skeleton classNames="md:sk-text flex-1 sk-button max-md:min-w-28 max-md:min-h-12" />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
