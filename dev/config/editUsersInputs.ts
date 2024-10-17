import { Role } from "@/auth.config";

export const editUsersInputs = [
  { id: "fullName", label: "fullname", type: "text", name: "fullName" },
  { id: "email", label: "email or username", type: "text", name: "email" },
  {
    id: "roles",
    label: "Roles",
    type: "select",
    name: "roles",
    options: Object.keys(Role)
      .filter((role) => isNaN(+role))
      .map((role) => ({
        value: Role[role as keyof typeof Role].toString(),
        label: role,
      })),
    multiple: true,
  },
] satisfies (Input | Select)[];
