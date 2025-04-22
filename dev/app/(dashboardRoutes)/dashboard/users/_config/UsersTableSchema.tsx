import OptionsBtn from "@/app/_components/Table/OptionsBtn";
import { Role } from "@/config/constants";
import { deleteUserAction } from "@/lib/usersActions";
import { ReactNode } from "react";

export type User = {
  id: string;
  fullName: string;
  email: string;
  roles: Role[];
};

export const schema = [
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
