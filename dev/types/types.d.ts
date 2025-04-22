interface FormField {
  type: string;
  name?: string;
  id: string;
  label?: string;
}

interface Input extends FormField {
  type: "text" | "password" | "email" | "number";
  suffex?: string;
  otherProps?: React.ComponentProps<"input">;
}

interface FileInput extends FormField {
  type: "file";
  multible?: boolean;
}

interface TextArea extends FormField {
  type: "textarea";
}

type SelectOption = { value: string; label: string; disabled?: boolean };

interface Select extends FormField {
  type: "select";
  options: SelectOption[];
  multiple?: boolean;
  otherProps?: React.ComponentProps<"select">;
}

type FileInputOther = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  disabled?: boolean;
  inputRef?: ForwardedRef<HTMLInputElement>;
};

type TextAreaOther = {
  disabled?: boolean;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

type AllInputs = Input | Select | FileInput | TextArea;

interface SideBarLink {
  href: string;
  label: string;
  icon: React.JSX;
}

type TableSchema<data> = {
  id: keyof data;
  label?: string;
  getData?: (data: data[keyof data], row: data) => React.ReactNode;
  skeletonData?: (zebrabg?: boolean) => React.ReactNode;
};
