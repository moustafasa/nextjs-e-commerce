export const signInInputs = [
  {
    type: "text",
    id: "username",
    label: "username",
    name: "email",
    otherProps: { autoComplete: "off" },
  },
  {
    type: "password",
    id: "password",
    label: "password",
    name: "password",
  },
] satisfies Input[];
