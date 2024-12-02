"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import { addProductsInputs } from "@/config/addProductInputs";
import { addProductsAction } from "@/lib/productsActions";
import { AddProductFlattenedError } from "@/models/zodSchemas/Product/addProductsSchema";
import { useFormState } from "react-dom";
import { ICategories } from "@/models/database/Categories";
import Form from "../../Forms/Form";
import AddProductImage from "./AddProductImage";

type Props = {
  categories: ICategories[];
};
export default function AddProductsForm({ categories }: Props) {
  const [errors, formAction] = useFormState(addProductsAction, undefined);

  return (
    <FormLayout heading="add product" errors={errors?.formErrors}>
      <Form formAction={formAction}>
        {addProductsInputs.map((input) => (
          <FormField
            key={input.id}
            input={
              input.name === "category" && input.type === "select"
                ? {
                    ...input,
                    options: [
                      ...input.options,
                      ...categories.map((cat) => ({
                        value: cat._id as string,
                        label: cat.title,
                      })),
                    ],
                  }
                : input
            }
            errors={
              errors?.fieldErrors[
                input.name as keyof Omit<
                  AddProductFlattenedError["fieldErrors"],
                  "images"
                >
              ]
            }
            defaultValue={input.type === "select" ? "" : undefined}
          />
        ))}
        <AddProductImage serverErrors={errors?.fieldErrors.images} />
        <SubmitButton label="add" />
      </Form>
    </FormLayout>
  );
}
