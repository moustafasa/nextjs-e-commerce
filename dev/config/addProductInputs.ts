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
    type: "textarea",
    name: "descriptions",
    id: "descriptions",
    label: "description",
  },
  {
    type: "number",
    name: "price",
    id: "price",
    label: "price",
    suffex: "pounds",
  },
  {
    type: "number",
    name: "discount",
    id: "discount",
    label: "discount",
    suffex: "pounds",
    otherProps: { defaultValue: 0 },
  },
  {
    type: "file",
    name: "images",
    id: "image",
    label: "images",
    multible: true,
  },
] satisfies AllInputs[];
