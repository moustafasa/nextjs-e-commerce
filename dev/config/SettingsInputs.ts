export const PersonalInfoInputs = [
  { type: "text", name: "fullName", id: "fullName", label: "full Name" },
  { type: "text", name: "email", id: "email", label: "email" },
] satisfies AllInputs[];

export const ProfileImgInput = {
  type: "file",
  name: "image",
  id: "image",
  label: "profile image",
} satisfies AllInputs;

export const PasswordInputs = [
  {
    type: "password",
    name: "oldPassword",
    id: "oldPassword",
    label: "old password",
  },
  {
    type: "password",
    name: "newPassword",
    id: "newPassword",
    label: "new password",
  },
  {
    type: "password",
    name: "passConfirm",
    id: "passConfirm",
    label: "confirm password",
  },
] satisfies AllInputs[];
