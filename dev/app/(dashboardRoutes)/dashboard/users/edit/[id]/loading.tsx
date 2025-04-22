import PageFormSk from "@/app/_components/skeletons/PageFormSk";
import { editUsersInputs } from "@/config/editUsersInputs";

export default function loading() {
  return <PageFormSk inputs={editUsersInputs} />;
}
