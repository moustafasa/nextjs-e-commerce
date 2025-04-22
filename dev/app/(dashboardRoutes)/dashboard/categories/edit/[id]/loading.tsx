import PageFormSk from "@/app/_components/skeletons/PageFormSk";
import { addCategoryInputs } from "@/config/addCategoryInputs";

export default function loading() {
  return <PageFormSk inputs={addCategoryInputs} />;
}
