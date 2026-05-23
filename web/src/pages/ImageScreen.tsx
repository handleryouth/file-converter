import { InputFile } from "../component";
import { useRef } from "react";
import { useTranslation } from "../translations";

export default function ImageScreen() {
  const { translate } = useTranslation();
  const inputFileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <InputFile
        containerClassName="flex flex-col items-center justify-center"
        label={{
          children: translate("input.put_image"),
          htmlFor: "input-image",
        }}
        input={{
          id: "input-image",
          ref: inputFileRef,
          onChange: () => console.log("testing"),
        }}
        buttonProps={{
          onClick: () => {
            inputFileRef.current?.click();
          },
        }}
      />
    </div>
  );
}
