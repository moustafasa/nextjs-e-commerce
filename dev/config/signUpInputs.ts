export const signUpInputs = [
  {
    type: "text",
    id: "full-name",
    name: "fullName",
    label: "full name",
    otherProps: { autoComplete: "off" },
  },
  {
    type: "text",
    id: "username",
    name: "email",
    label: "username",
    otherProps: { autoComplete: "off" },
  },
  {
    type: "password",
    id: "password",
    name: "password",
    label: "password",
  },
  {
    type: "password",
    id: "pass-confirm",
    name: "passConfirm",
    label: "repeat password",
  },
] satisfies Input[];
