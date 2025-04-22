"use client";
import Form from "@/app/_components/Forms/Form";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import FormButton from "@/app/_components/Forms/FormButton";
import { addStockInputs } from "@/config/addStockInputs";
import { addToStockAction } from "@/lib/productsActions";
import { AddToStockFlattenedError } from "@/models/zodSchemas/Product/addToStockSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState, useActionState } from "react";

type Props = { categories: SelectOption[]; products: SelectOption[] };
const AddToStockForm = ({ categories, products }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [product, setProduct] = useState("");
  const [errors, formAction] = useActionState(addToStockAction, undefined);
  return (
    <FormLayout heading="add to stock" errors={errors?.formErrors}>
      <Form formAction={formAction}>
        {addStockInputs.map((input) => (
          <FormField
            key={input.id}
            input={
              input.type === "select"
                ? {
                    ...input,
                    options: [
                      ...input.options,
                      ...(input.name === "product" ? products : categories),
                    ],
                  }
                : input
            }
            errors={
              errors?.fieldErrors[
                input.name as keyof AddToStockFlattenedError["fieldErrors"]
              ]
            }
            defaultValue={
              input.name === "category"
                ? searchParams.get("category") || ""
                : undefined
            }
            value={input.name === "product" ? product : undefined}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              if (input.name === "category") {
                if (e.target.value !== "")
                  router.push(`${pathname}?category=${e.target.value}`);
                else router.push(pathname);
                setProduct("");
              }
              if (input.name === "product") setProduct(e.target.value);
            }}
            disabled={input.name === "stock" && !product}
          />
        ))}
        <FormButton label="add" />
      </Form>
    </FormLayout>
  );
};

export default AddToStockForm;
