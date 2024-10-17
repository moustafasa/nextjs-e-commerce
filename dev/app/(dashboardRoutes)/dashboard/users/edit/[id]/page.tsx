import EditUserForm from "@/app/_components/dashboard/Users/EditUserForm";
import { getUserById, getUsersIds } from "@/lib/usersControllers";
import { notFound } from "next/navigation";

// export const dynamicParams = false;

type Props = { params: { id: string } };
export default async function Page({ params: { id } }: Props) {
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

// export const generateStaticParams = async () => {
//   const usersIds = await getUsersIds();
//   return usersIds.map((id) => ({ params: { id } }));
// };
