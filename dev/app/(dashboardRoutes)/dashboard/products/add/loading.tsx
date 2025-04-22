import PageFormSk from "@/app/_components/skeletons/PageFormSk";
import { addProductsInputs } from "@/config/addProductInputs";

export default function loading() {
  return <PageFormSk inputs={addProductsInputs} />;
}
