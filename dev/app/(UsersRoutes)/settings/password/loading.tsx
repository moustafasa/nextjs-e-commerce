import FormFieldSkeleton from "@/app/_components/skeletons/FormFieldSk";
import { PasswordInputs } from "@/config/SettingsInputs";
import FormSk from "@/app/_components/skeletons/FormSk";

export default function loading() {
  return (
    <FormSk
      bgLight
      className="dark:bg-black-tertiery-bg bg-slate-200 p-14 rounded-lg"
    >
      {PasswordInputs.map((input) => (
        <FormFieldSkeleton type={input.type} key={input.id} bgLight />
      ))}
    </FormSk>
  );
}
