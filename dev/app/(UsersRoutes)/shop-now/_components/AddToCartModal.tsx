"use client";
import Image from "next/image";
import useAddToCartModalContext from "@/app/context/AddToCartModalContext/useAddToCartModalContext";
import useAddToCartAction from "@/app/_utilities/useAddToCartAction";
import { useEffect } from "react";
import Modal from "@/app/_components/Modal/Modal";
import FormNumberInput from "@/app/_components/Forms/FormField/FormNumberInput";
import FormButton from "@/app/_components/Forms/FormButton";

type Props = { productId: string; img: string; title: string };

export default function AddToCartModal({ productId, title, img }: Props) {
  const [isOpen, setIsOpen] = useAddToCartModalContext();
  const [state, formAction] = useAddToCartAction(productId);

  useEffect(() => {
    if (state?.submitted && !state.error) {
      setIsOpen(false);
    }
  }, [state, setIsOpen]);

  return (
    <Modal
      title={`add ${title} to cart`}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src={img}
          width={100}
          height={100}
          alt={title}
          className="w-auto h-auto"
        />
        <form
          action={formAction}
          className="flex flex-col items-center justify-center w-full"
        >
          <FormNumberInput error={state?.error} />
          <div className="text-sm capitalize text-red-error font-bold mb-3 mt-1 px-2 ">
            {state?.error}
          </div>
          <FormButton label="add to cart" />
        </form>
      </div>
    </Modal>
  );
}
