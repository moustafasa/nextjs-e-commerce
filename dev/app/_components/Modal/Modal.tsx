import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-bg bg-opacity-50 backdrop-blur-md"
    >
      <div className=" bg-black-tertiery-bg rounded-lg shadow-lg max-w-[90%] w-full sm:max-w-[600px] p-6">
        {title && (
          <h2 className="text-2xl font-bold text-center mb-4  capitalize">
            {title}
          </h2>
        )}
        <button
          className="absolute top-4 right-4 text-gray-icons hover:text-white text-4xl font-bold"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
