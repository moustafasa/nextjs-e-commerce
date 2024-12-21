export const addStockInputs = [
  {
    type: "select",
    name: "category",
    id: "category",
    label: "category",
    options: [{ value: "", label: "all" }],
  },
  {
    type: "select",
    name: "product",
    id: "product",
    label: "product",
    options: [{ value: "", label: "choose", disabled: true }],
  },
  { type: "number", name: "stock", id: "stock", label: "qty added to stock" },
] satisfies AllInputs[];
