import { getCategories } from "@/lib/categoriesControllers";
import CategoryFilterITem from "./CategoryFilterITem";

export default async function CategorySideNav() {
  const categories = await getCategories();
  return (
    <div className="md:fixed md:top-nav-h dark:md:bg-black-nav md:bg-white md:w-shop-now-side-nav-w md:left-0 md:max-h-[calc(100vh-theme(spacing.nav-h))] z-30 overflow-auto">
      <h2 className="text-2xl font-bold capitalize mt-7 mb-2 md:ps-2 ps-3">
        categories
      </h2>
      <ul className="ps-5 flex md:flex-col md:gap-2 max-md:flex-wrap max-md:gap-4 pb-7">
        {categories.map((category) => (
          <CategoryFilterITem key={category._id} category={category} />
        ))}
      </ul>
    </div>
  );
}
