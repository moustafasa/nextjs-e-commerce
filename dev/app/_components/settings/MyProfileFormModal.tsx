import Modal from "@/app/_components/Modal/Modal";
import FormField from "../Forms/FormField/FormField";
import SubmitButton from "../Forms/SubmitButton";
import { useState } from "react";

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

  return (
    <Modal
      onClose={onClose}
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
        <SubmitButton label="save" disabled={!password} />
      </div>
    </Modal>
  );
}
