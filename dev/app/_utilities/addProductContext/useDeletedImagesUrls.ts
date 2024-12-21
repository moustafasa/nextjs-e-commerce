import { useContext } from "react";
import { addProductContext } from "./addProductContext";

export default function useDeletedImagesUrls() {
  const { deletedImagesUrls } = useContext(addProductContext);
  return deletedImagesUrls;
}
