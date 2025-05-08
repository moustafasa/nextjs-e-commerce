import { getUserById, getUsersIds } from "@/lib/usersControllers";
import { notFound } from "next/navigation";
import EditUserForm from "../../_components/EditUserForm";

export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };
export default async function Page({ params }: Props) {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) {
    notFound();
  }
  const convertedUser = user.toObject();
  return (
    <EditUserForm
      user={{ ...convertedUser, _id: convertedUser._id.toString() }}
    />
  );
}

export const generateStaticParams = async () => {
  const usersIds = await getUsersIds();
  return usersIds.map((id) => ({ params: { id } }));
};
