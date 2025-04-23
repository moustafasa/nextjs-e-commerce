import Modal from "@/app/_components/Modal/Modal";
import FormField from "../../../_components/Forms/FormField/FormField";
import FormButton from "../../../_components/Forms/FormButton";
import { useState } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  errors?: string[];
};

export default function MyProfileFormModal({
  isModalOpen,
  onClose,
  errors,
}: Props) {
  const [password, setPassword] = useState("");
  const { pending } = useFormStatus();

  return (
    <Modal
      onClose={() => {
        if (!pending) {
          onClose();
        }
      }}
      isOpen={isModalOpen}
      title="write your password to save changes"
    >
      <div className="grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center mt-10">
        <FormField
          input={{
            type: "password",
            name: "password",
            id: "password",
            label: "password",
          }}
          errors={errors}
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton label="save" disabled={!password} />
      </div>
    </Modal>
  );
}
