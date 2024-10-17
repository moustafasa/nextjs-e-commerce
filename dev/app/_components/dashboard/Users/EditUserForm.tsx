"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import { Role } from "@/auth.config";
import { editUsersInputs } from "@/config/editUsersInputs";
import { editUserAction } from "@/lib/usersActions";
import { IUser } from "@/models/database/Users";
import { EditUserFlattenedError } from "@/models/zodSchemas/User/editUserSchema";
import { ChangeEvent, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import FormLayout from "../../Forms/FormLayout";

type Props = { user: Omit<IUser, "password" | "image"> };

export default function EditUserForm({ user }: Props) {
  const [fields, setFields] = useState(
    Object.fromEntries(
      editUsersInputs.map((input) => {
        return [input.name, user[input.name as keyof typeof user]];
      })
    )
  );

  const isChanged = useMemo(
    () =>
      Object.keys(fields).some((input) =>
        input !== "roles"
          ? user[input as keyof typeof user] !== fields[input]
          : (fields.roles as Role[]).length !== user.roles.length ||
            (fields.roles as Role[]).some((role) => !user.roles.includes(role))
      ),
    [user, fields]
  );

  const [errors, formAction] = useFormState(
    editUserAction.bind(null, user._id as string),
    undefined
  );
  return (
    <FormLayout
      formAction={formAction}
      heading="edit user"
      errors={errors?.formErrors}
    >
      {editUsersInputs.map((input: Input | Select) => (
        <FormField
          key={input.id}
          input={input}
          errors={
            errors?.fieldErrors[
              input.name as keyof EditUserFlattenedError["fieldErrors"]
            ]
          }
          value={fields[input.name] as string}
          onChange={(
            e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
          ) => {
            const value =
              input.type === "select"
                ? Array.from(
                    (e.target as HTMLSelectElement).selectedOptions,
                    (opt) => +opt.value
                  )
                : e.target.value;

            setFields((prev) => ({ ...prev, [input.name]: value }));
          }}
        />
      ))}

      <SubmitButton label="save" disabled={!isChanged} />
    </FormLayout>
  );
}