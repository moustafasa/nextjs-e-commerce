import { getCategoryById } from "@/lib/categoriesControllers";
import { notFound } from "next/navigation";
import EditCategoryForm from "../../_components/EditCategoryForm";
import { getUsersIds } from "@/lib/usersControllers";

export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };
export default async function Page({ params }: Props) {
  const { id } = await params;
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

export const generateStaticParams = async () => {
  const usersIds = await getUsersIds();
  return usersIds.map((id) => ({ params: { id } }));
};
