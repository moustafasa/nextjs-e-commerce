"use client";
import useSettingsLayoutErrors from "@/app/_utilities/SettingsLayoutErrorsContext/useSettingsLayoutErrors";
import FormLayout from "../../../_components/Forms/FormLayout";

type Props = { children: React.ReactNode };
export default function SettingsLayout({ children }: Props) {
  const [errors] = useSettingsLayoutErrors();
  return (
    <FormLayout errors={errors} heading="account setting" maxWidth="1000px">
      {children}
    </FormLayout>
  );
}
