import { getCategoryById } from "@/lib/categoriesControllers";
import { notFound } from "next/navigation";
import EditCategoryForm from "../../_components/EditCategoryForm";

export const dynamicParams = false;

type Props = { params: { id: string } };
export default async function Page({ params: { id } }: Props) {
  const category = await getCategoryById(id);
  if (!category) {
    notFound();
  }
  const convertedCategory = category.toObject();
  return (
    <EditCategoryForm
      category={{
        ...convertedCategory,
        _id: convertedCategory._id.toString() as string,
      }}
    />
  );
}

// export const generateStaticParams = async () => {
//   await dbConnect();
//   const usersIds = await getUsersIds();
//   return usersIds.map((id) => ({ params: { id } }));
// };
