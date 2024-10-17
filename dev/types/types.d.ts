interface FormField {
  type: string;
  name: string;
  id: string;
  label: string;
}

interface Input extends FormField {
  type: "text" | "password" | "email" | "number";
  otherProps?: React.ComponentProps<"input">;
}

interface FileInput extends FormField {
  type: "file";
}

interface Select extends FormField {
  type: "select";
  options: { value: string; label: string }[];
  multiple?: boolean;
  otherProps?: React.ComponentProps<"select">;
}

type FileInputOther = {
  onChange?: (fileUrl: string) => void;
  value: string;
  defaultValue: string;
};

type AllInputs = Input | Select | FileInput;

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
