"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AddProductContext = {
  id?: string;
  isImageLoading: [boolean, Dispatch<SetStateAction<boolean>>];
  imagesUrls: [string[], Dispatch<SetStateAction<string[]>>];
};

export const addProductContext = createContext<AddProductContext>({
  id: undefined,
  isImageLoading: [false, () => {}],
  imagesUrls: [[], () => {}],
});

export default function AddProductContext({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const isImageLoading = useState(false);
  const imagesUrls = useState<string[]>([]);
  return (
    <addProductContext.Provider value={{ id, isImageLoading, imagesUrls }}>
      {children}
    </addProductContext.Provider>
  );
}
