import { getUsers, getUsersMeta } from "@/lib/usersControllers";
import { FaUserPlus } from "react-icons/fa";
import { schema, type User } from "./users/_config/UsersTableSchema";
import { Suspense } from "react";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";
import CustomPagination from "@/app/_components/CustomPagination";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};
export default async function page({ searchParams }: Props) {
  const { page, search } = await searchParams;
  return (
    <>
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
          <TableBody<User>
            schema={schema}
            data={getUsers(page ? +page : 1, search)}
            keyIndex={"id"}
          />
        </Suspense>
      </TableLayout>
      <CustomPagination
        searchParams={searchParams}
        getMetaData={getUsersMeta(search)}
      />
    </>
  );
}
