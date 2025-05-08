import FormButtonSk from "@/app/_components/skeletons/FormButtonSk";
import FormFieldSkeleton from "@/app/_components/skeletons/FormFieldSk";
import FormSk from "@/app/_components/skeletons/FormSk";
import { PersonalInfoInputs } from "@/config/SettingsInputs";
export default function MyProfileFormSk() {
  return (
    <FormSk>
      <FormFieldSkeleton type="file" />
      <div className=" grid grid-cols-subgrid col-span-2 p-4 border-[1px] rounded-lg border-gray-input mb-9">
        <h3 className="mb-9 capitalize col-span-2 text-lg font-bold ">
          personal info
        </h3>
        <div className="grid grid-cols-subgrid  col-span-2 px-9">
          {PersonalInfoInputs.map((input) => (
            <FormFieldSkeleton type={input.type} key={input.id} />
          ))}
        </div>
      </div>

      <FormButtonSk />
    </FormSk>
  );
}
