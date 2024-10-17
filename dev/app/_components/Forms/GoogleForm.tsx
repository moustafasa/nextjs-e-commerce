import { googleSignIn } from "@/lib/usersActions";
import React from "react";
import { useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";

type Props = { label: string };

const SubmitButton = ({ label }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      className=" form-button mx-auto flex items-center justify-center gap-2 w-full disabled:pointer-events-none disabled:bg-blue-button-disabled "
      disabled={pending}
      aria-disabled={pending}
      type="submit"
    >
      <FcGoogle size={30} /> {pending ? "loading..." : label}
    </button>
  );
};

export default function GoogleForm({ label }: Props) {
  return (
    <form action={googleSignIn}>
      <SubmitButton label={label} />
    </form>
  );
}
