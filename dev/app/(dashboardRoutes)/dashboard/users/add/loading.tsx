import PageFormSk from "@/app/_components/skeletons/PageFormSk";
import { addUserInputs } from "@/config/addUsersInputs";

export default function loading() {
  return <PageFormSk inputs={addUserInputs} />;
}
