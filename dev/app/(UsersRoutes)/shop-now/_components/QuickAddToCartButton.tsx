"use client";

import useAddToCartModalContext from "@/app/context/AddToCartModalContext/useAddToCartModalContext";

export default function QuickAddToCartButton() {
  const [, setIsOpen] = useAddToCartModalContext();
  return (
    <button
      className="form-button"
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      add to cart
    </button>
  );
}
