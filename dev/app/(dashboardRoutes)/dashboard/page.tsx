import TableBody from "@/app/_components/dashboard/Table/TableBody";
import TableHeader from "@/app/_components/dashboard/Table/TableHeader";
import TableLayout from "@/app/_components/dashboard/Table/TableLayout";
import OptionsBtn from "@/app/_components/dashboard/Table/OptionsBtn";
import { Role } from "@/auth.config";
import { getUsers } from "@/lib/usersControllers";
import { ReactNode } from "react";
import { FaUserPlus } from "react-icons/fa";
import { deleteUserAction } from "@/lib/usersActions";

type User = { id: string; fullName: string; email: string; roles: Role[] };

export default async function page() {
  const schema = [
    {
      id: "fullName",
      getData(data) {
        return data as ReactNode;
      },
    },
    {
      id: "email",
      getData(data) {
        return data as ReactNode;
      },
    },
    {
      id: "roles",
      getData(data) {
        return (data as number[] | undefined)
          ?.map((role) => Role[role].toLowerCase())
          .join(" , ");
      },
    },
    {
      id: "id",
      label: "options",
      getData(id) {
        return (
          <OptionsBtn
            id={id as string}
            basePath="dashboard/users"
            deleteAction={deleteUserAction}
          />
        );
      },
    },
  ] satisfies TableSchema<User>[];

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
      <TableBody<User> schema={schema} data={getUsers()} keyIndex={"id"} />
    </TableLayout>
  );
}
