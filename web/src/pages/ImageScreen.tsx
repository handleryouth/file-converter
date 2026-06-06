import { InputFile, PhotoCropperModal } from "../component";
import { useRef, useState } from "react";
import { useTranslation } from "../translations";

export default function ImageScreen() {
  const { translate } = useTranslation();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [imageInput, setImageInput] = useState<string>();

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
          onChange: (value) => {
            setShowCrop(true);
            const file = value.target.files?.[0];

            if (file) {
              setImageInput(URL.createObjectURL(file));
            }
          },
        }}
        buttonProps={{
          onClick: () => {
            inputFileRef.current?.click();
          },
        }}
      />

      <PhotoCropperModal
        imageValue={imageInput}
        onOpenChange={setShowCrop}
        visible={showCrop}
        onCroppedImage={() => console.log("testing")}
      />
    </div>
  );
}
