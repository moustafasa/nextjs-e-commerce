import { Role } from "@/config/constants";
import { z, ZodSchema } from "zod";

export const passConfRefinement = <T extends ZodSchema>(
  schema: T,
  pass = "password",
  passConfirm = "passConfirm"
) => {
  return schema.refine((data) => data[pass] === data[passConfirm], {
    message: "repeated password should be identical with password",
    path: ["passConfirm"],
  });
};
export const passOptionalityRefinement = <T extends ZodSchema>(schema: T) => {
  return schema.refine(
    (data) =>
      (data.password.length > 1 &&
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) ||
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email),
    {
      message:
        "the password is required or you can add an valid email not username",
      path: ["password"],
    }
  );
};

export const baseUserSchema = z.object({
  fullName: z
    .string({ required_error: "the fullname is required" })
    .min(1, { message: "the full name is required" })
    .regex(
      /^[a-zA-Z]+\s[a-zA-z0-9]+$/g,
      "the full name should contain the firstname and lastname seperated by space"
    )
    .toLowerCase(),
  email: z
    .string({ required_error: "email or username is required" })
    .min(1, { message: "the email or username is required" })
    .min(3, { message: "the username should be at least 3 characters" })
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: "password should be at least 6 characters" })
    .max(20, "password should't be more than 20 characters"),
  passConfirm: z.string(),
  roles: z.preprocess((role) => {
    return (role as string[]).map((r) => +r);
  }, z.array(z.nativeEnum(Role)).min(1, "please select user roles")),
});
