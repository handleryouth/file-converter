import {
  Label,
  InputGroup,
  ErrorMessage,
  TextField,
  Button,
} from "@heroui/react";
import { useField } from "formik";
import { useState, type ComponentPropsWithoutRef } from "react";
import eyeSlash from "../assets/icons/eye-slash.svg";
import eye from "../assets/icons/eye.svg";

interface InputPasswordProps {
  label?: ComponentPropsWithoutRef<typeof Label>;
  input?: Omit<
    ComponentPropsWithoutRef<typeof InputGroup.Input>,
    "name" | "type"
  >;
  name: string;
}

export default function InputPassword({
  label,
  input,
  name,
}: InputPasswordProps) {
  const [field, meta] = useField(name);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <TextField className="w-full max-w-[280px]" name={name}>
      <Label {...label} />
      <InputGroup>
        <InputGroup.Input
          {...field}
          {...input}
          type={isVisible ? "text" : "password"}
        />

        <InputGroup.Suffix className="pr-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <img src={eye} width={20} height={20} />
            ) : (
              <img src={eyeSlash} width={20} height={20} />
            )}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
    </TextField>
  );
}
