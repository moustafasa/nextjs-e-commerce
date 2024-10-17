export const addProductsInputs = [
  { type: "text", name: "title", id: "title", label: "title" },
  {
    type: "select",
    name: "category",
    id: "category",
    label: "category",
    options: [],
  },
  {
    type: "text",
    name: "descriptions",
    id: "descriptions",
    label: "description",
  },
  {
    type: "number",
    name: "price",
    id: "price",
    label: "price",
  },
  {
    type: "number",
    name: "discount",
    id: "discount",
    label: "discount",
  },
  { type: "file", name: "images", id: "image", label: "images" },
] satisfies AllInputs[];
