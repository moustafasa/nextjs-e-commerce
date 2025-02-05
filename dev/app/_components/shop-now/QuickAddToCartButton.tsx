"use client";

import useAddToCartModalContext from "@/app/_utilities/useAddToCartModalContext";

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
