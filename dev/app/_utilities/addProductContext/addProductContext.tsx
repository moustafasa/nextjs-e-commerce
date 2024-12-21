"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AddProductContext = {
  isLoading: [boolean, Dispatch<SetStateAction<boolean>>];
  imagesUrls: [string[], Dispatch<SetStateAction<string[]>>];
  deletedImagesUrls: [string[], Dispatch<SetStateAction<string[]>>];
};

export const addProductContext = createContext<AddProductContext>({
  isLoading: [false, () => {}],
  imagesUrls: [[], () => {}],
  deletedImagesUrls: [[], () => {}],
});

export default function AddProductContext({
  children,
}: {
  children: ReactNode;
}) {
  const isLoading = useState(false);
  const imagesUrls = useState<string[]>([]);
  const deletedImagesUrls = useState<string[]>([]);
  return (
    <addProductContext.Provider
      value={{ isLoading, imagesUrls, deletedImagesUrls }}
    >
      {children}
    </addProductContext.Provider>
  );
}
