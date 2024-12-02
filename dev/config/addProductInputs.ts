export const addProductsInputs = [
  {
    type: "select",
    name: "category",
    id: "category",
    label: "category",
    options: [{ value: "", label: "choose", disabled: true }],
  },
  { type: "text", name: "title", id: "title", label: "title" },
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
] satisfies AllInputs[];

export const productsImages = {
  type: "file",
  name: undefined,
  id: "image",
  label: "images",
  multible: true,
} satisfies AllInputs;
