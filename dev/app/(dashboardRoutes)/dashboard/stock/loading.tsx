import PageFormSk from "@/app/_components/skeletons/PageFormSk";
import { addStockInputs } from "@/config/addStockInputs";

export default function loading() {
  return <PageFormSk inputs={addStockInputs} />;
}
