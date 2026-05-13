import { InputFile } from "../component";
import { useRef } from "react";

export default function ImageScreen() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <InputFile
        containerClassName="flex flex-col items-center justify-center"
        label={{
          children: "Please Input the Image!",
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
