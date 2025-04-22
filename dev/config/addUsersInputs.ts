import { Role } from "./constants";

export const addUserInputs = [
  {
    id: "fullName",
    label: "fullname",
    type: "text",
    name: "fullName",
    otherProps: { autoComplete: "off" },
  },
  {
    id: "email",
    label: "email or username",
    type: "text",
    name: "email",
    otherProps: { autoComplete: "off" },
  },
  {
    id: "password",
    label: "password",
    type: "password",
    name: "password",
  },
  {
    type: "password",
    id: "pass-confirm",
    name: "passConfirm",
    label: "repeat password",
  },
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
    otherProps: {
      defaultValue: [Role.USER.toString()],
    },
  },
] satisfies (Input | Select)[];
