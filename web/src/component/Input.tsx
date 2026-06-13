import { ErrorMessage, InputGroup, Label, TextField } from "@heroui/react";
import type { ComponentPropsWithoutRef } from "react";
import { useField } from "formik";

interface InputProps {
  label?: ComponentPropsWithoutRef<typeof Label>;
  input?: Omit<ComponentPropsWithoutRef<typeof InputGroup.Input>, "name">;
  name: string;
}

export default function Input({ label, input, name }: InputProps) {
  const [field, meta] = useField(name);
  return (
    <TextField className="w-full" name={name}>
      <Label {...label} />
      <InputGroup>
        <InputGroup.Input {...field} {...input} />
      </InputGroup>
      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
    </TextField>
  );
}
