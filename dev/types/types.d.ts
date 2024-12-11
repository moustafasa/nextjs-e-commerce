interface FormField {
  type: string;
  name?: string;
  id: string;
  label: string;
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

interface Select extends FormField {
  type: "select";
  options: { value: string; label: string; disabled?: boolean }[];
  multiple?: boolean;
  otherProps?: React.ComponentProps<"select">;
}

type FileInputOther = {
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  disabled?: boolean;
  inputRef?: ForwardedRef<HTMLInputElement>;
};

type TextAreaOther = { disabled?: boolean };

type AllInputs = Input | Select | FileInput | TextArea;

interface SideBarLink {
  href: string;
  label: string;
  icon: React.JSX;
}

type TableSchema<data> = {
  id: keyof data;
  label?: string;
  getData?: (data: data[keyof data]) => React.ReactNode;
};
