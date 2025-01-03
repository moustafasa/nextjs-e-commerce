import { getCategories } from "@/lib/categoriesControllers";
import CategoryFilterITem from "./CategoryFilterITem";

export default async function CategorySideNav() {
  const categories = await getCategories();
  return (
    <div className="text-white md:fixed md:top-nav-h md:bg-black-nav md:w-shop-now-side-nav-w md:left-0 md:h-full">
      <h2 className="text-2xl font-bold capitalize mt-7 mb-2 md:ps-2 ps-3">
        categories
      </h2>
      <form>
        <ul className="ps-5 flex md:flex-col md:gap-2 max-md:flex-wrap max-md:gap-4">
          {categories.map((category) => (
            <CategoryFilterITem key={category._id} category={category} />
          ))}
        </ul>
      </form>
    </div>
  );
}
