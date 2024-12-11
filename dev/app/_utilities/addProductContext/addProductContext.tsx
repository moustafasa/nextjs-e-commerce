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
  loadingQueue: [boolean[], Dispatch<SetStateAction<boolean[]>>];
  imagesUrls: [string[], Dispatch<SetStateAction<string[]>>];
};

export const addProductContext = createContext<AddProductContext>({
  id: undefined,
  loadingQueue: [[], () => {}],
  imagesUrls: [[], () => {}],
});

export default function AddProductContext({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const loadingQueue = useState<boolean[]>([]);
  const imagesUrls = useState<string[]>([]);
  return (
    <addProductContext.Provider value={{ id, loadingQueue, imagesUrls }}>
      {children}
    </addProductContext.Provider>
  );
}
