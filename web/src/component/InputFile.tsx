import { Button, Input } from "@heroui/react";
import { type ComponentProps } from "react";

type NativeInputType = Exclude<ComponentProps<typeof Input>, "type">;

type NativeLabelType = ComponentProps<"label">;

type NativeButtonType = ComponentProps<typeof Button>;

interface InputProps {
  label: NativeLabelType;
  input: NativeInputType;
  containerClassName?: string;
  buttonProps?: NativeButtonType;
}

export default function InputFile({
  containerClassName,
  label,
  input,
  buttonProps,
}: InputProps) {
  const { children: buttonChildren, ...buttonPropsRest } = buttonProps ?? {};
  return (
    <div className={`flex flex-col gap-2 ${containerClassName ?? ""}`}>
      <label {...label} className={`font-bold ${label.className ?? ""}`}>
        {label.children}
      </label>
      <Input
        {...input}
        className={`${input.className ?? ""} hidden`}
        placeholder={input.placeholder ?? "Please Input Image"}
        type="file"
      />
      <Button {...buttonPropsRest}>{buttonChildren ?? "Input File"}</Button>
    </div>
  );
}
