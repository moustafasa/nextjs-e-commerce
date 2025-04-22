import { getUsers } from "@/lib/usersControllers";
import { FaUserPlus } from "react-icons/fa";
import { schema, type User } from "./users/_config/UsersTableSchema";
import { Suspense } from "react";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";

export default async function page() {
  return (
    <TableLayout
      tableName="users"
      addBtn={{
        Icon: <FaUserPlus />,
        label: "add user",
        href: "/dashboard/users/add",
      }}
    >
      <TableHeader<User> schema={schema} />
      <Suspense fallback={<TableBodySkeleton<User> schema={schema} />}>
        <TableBody<User> schema={schema} data={getUsers()} keyIndex={"id"} />
      </Suspense>
    </TableLayout>
  );
}
