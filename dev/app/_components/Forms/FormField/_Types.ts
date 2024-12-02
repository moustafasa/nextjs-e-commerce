export type Props<T extends AllInputs = AllInputs> = {
  input: T;
  errors: string[] | undefined;
} & (T extends Select
  ? React.ComponentProps<"select">
  : T extends FileInput
  ? FileInputOther
  : T extends TextArea
  ? TextAreaOther
  : React.ComponentProps<"input">);
