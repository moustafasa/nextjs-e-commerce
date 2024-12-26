export const PersonalInfoInputs = [
  { type: "text", name: "fullName", id: "fullName", label: "fullname" },
  { type: "text", name: "email", id: "email", label: "email" },
] satisfies AllInputs[];

export const ProfileImgInput = {
  type: "file",
  name: "image",
  id: "image",
  label: "profile image",
} satisfies AllInputs;
