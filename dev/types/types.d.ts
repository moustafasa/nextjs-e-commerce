interface Input {
  type: string;
  name: string;
  id: string;
  label: string;
  otherProps?: React.ComponentProps<"input">;
}
