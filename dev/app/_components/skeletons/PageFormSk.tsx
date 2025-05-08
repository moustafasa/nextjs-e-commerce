import FormFieldSkeleton from "./FormFieldSk";
import FormLayoutSkeleton from "./FormLayoutSk";

type Props = {
  inputs: AllInputs[];
};
export default function PageFormSk({ inputs }: Props) {
  return (
    <FormLayoutSkeleton>
      {inputs.map((input) => (
        <FormFieldSkeleton
          type={
            input.type === "select" && input.multiple ? "textarea" : input.type
          }
          key={input.id}
        />
      ))}
    </FormLayoutSkeleton>
  );
}
