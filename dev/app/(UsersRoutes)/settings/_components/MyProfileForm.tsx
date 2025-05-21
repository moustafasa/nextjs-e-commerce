"use client";
import Form from "@/app/_components/Forms/Form";
import FormField from "@/app/_components/Forms/FormField/FormField";
import useSettingsLayoutErrors from "@/app/_utilities/SettingsLayoutErrorsContext/useSettingsLayoutErrors";
import { PersonalInfoInputs, ProfileImgInput } from "@/config/SettingsInputs";
import { changeMyProfileAction } from "@/lib/SettingsActions";
import { useEffect, useMemo, useRef, useState, useActionState } from "react";
import MyProfileFormModal from "./MyProfileFormModal";
import FormButton from "../../../_components/Forms/FormButton";

type Props = {
  img: string | undefined;
  fullName: string;
  email: string;
  provider: string;
};
export default function MyProfileForm({
  img,
  fullName,
  email,
  provider,
}: Props) {
  const [errors, formAction] = useActionState(changeMyProfileAction, undefined);
  const [fields, setFields] = useState({ fullName, email, img: false });
  const [, setErrors] = useSettingsLayoutErrors();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputs = useRef(
    provider === "google"
      ? PersonalInfoInputs.filter((input) => input.id !== "email")
      : PersonalInfoInputs
  );

  const isChanged = useMemo(() => {
    if (fields.img) return true;
    return Object.keys(fields).some(
      (fieldKey) =>
        typeof fields[fieldKey as keyof typeof fields] !== "boolean" &&
        fields[fieldKey as keyof typeof fields] !==
          (fieldKey === "fullName" ? fullName : email)
    );
  }, [fields, fullName, email]);

  useEffect(() => {
    setErrors(errors?.formErrors || []);

    if (!errors?.fieldErrors.password && isModalOpen) {
      if (
        errors?.fieldErrors ||
        (errors?.formErrors && errors.formErrors.length > 0 && isModalOpen)
      ) {
        setIsModalOpen(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, setErrors]);

  return (
    <Form
      formAction={(formData) => {
        formAction(formData);
        if (!errors) setFields((prev) => ({ ...prev, img: false }));
        if (isModalOpen) setIsModalOpen(false);
      }}
      className="block"
    >
      <FormField
        input={ProfileImgInput}
        errors={errors?.fieldErrors.image}
        defaultValue={img}
        onChange={(e) => {
          if (e.target.files) setFields({ ...fields, img: true });
        }}
      />
      <div className="p-4 border-[1px] rounded-lg border-gray-input mb-9">
        <h3 className="mb-9 capitalize  sm:col-span-2 text-lg font-bold ">
          personal info
        </h3>
        <div className="grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center capitalize sm:px-9">
          {inputs.current.map((input) => (
            <FormField
              key={input.id}
              input={input}
              errors={
                errors?.fieldErrors[input.id as keyof typeof errors.fieldErrors]
              }
              defaultValue={input.id === "fullName" ? fullName : email}
              onChange={(e) =>
                setFields({ ...fields, [input.id]: e.target.value })
              }
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <MyProfileFormModal
          isModalOpen={true}
          onClose={() => {
            setIsModalOpen(false);
            if (errors?.fieldErrors.password) errors.fieldErrors.password = [];
          }}
          errors={errors?.fieldErrors.password}
        />
      )}

      <FormButton
        type={provider === "google" ? "submit" : "button"}
        label="save"
        disabled={!isChanged}
        onClick={() => {
          if (provider !== "google") setIsModalOpen(true);
        }}
        showLoading={provider === "google"}
        className=" block"
      />
    </Form>
  );
}
