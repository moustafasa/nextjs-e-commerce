"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormButton from "@/app/_components/Forms/FormButton";
import { Role } from "@/auth.config";
import { editUsersInputs } from "@/config/editUsersInputs";
import { editUserAction } from "@/lib/usersActions";
import { IUser } from "@/models/database/Users";
import { EditUserFlattenedError } from "@/models/zodSchemas/User/editUserSchema";
import { ChangeEvent, useMemo, useState, useActionState } from "react";
import FormLayout from "../../Forms/FormLayout";
import Form from "../../Forms/Form";

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

  const [errors, formAction] = useActionState(
    editUserAction.bind(null, user._id as string),
    undefined
  );
  return (
    <FormLayout heading="edit user" errors={errors?.formErrors}>
      <Form formAction={formAction}>
        {editUsersInputs.map((input: Input | Select) => (
          <FormField
            key={input.id}
            input={input}
            errors={
              errors?.fieldErrors[
                input.name as keyof EditUserFlattenedError["fieldErrors"]
              ]
            }
            value={fields[input.name as string] as string}
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

              setFields((prev) => ({ ...prev, [input.name as string]: value }));
            }}
          />
        ))}

        <FormButton label="save" disabled={!isChanged} />
      </Form>
    </FormLayout>
  );
}
