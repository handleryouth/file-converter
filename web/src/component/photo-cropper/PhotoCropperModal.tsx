import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Button, Modal } from "@heroui/react";
import CropSize from "./CropSize";
import ZoomSlider from "./ZoomSlider";
import rotateRight from "../../assets/icons/rotate-right.svg";
import { useTranslation } from "../../translations";
import { ASPECT_SIZES_MAPPING, type AspectRatioKey } from "./CropOptions";

interface PhotoCropperModalProps {
  onCroppedImage: () => void;
  visible: boolean;
  onOpenChange: (isOpen: boolean) => void;
  imageValue: string | undefined;
}

export default function PhotoCropperModal({
  onCroppedImage,
  onOpenChange,
  visible,
  imageValue,
}: PhotoCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState<number>();
  const [zoom, setZoom] = useState(1);

  const { translate } = useTranslation();

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
    onCroppedImage();
  };

  return (
    <Modal>
      <Modal.Backdrop isOpen={visible} onOpenChange={onOpenChange}>
        <Modal.Container size="cover">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="font-bold text-2xl">
                {translate("common.adjustment")}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col items-center gap-y-4">
              <div className="relative w-4xl h-full">
                <Cropper
                  image={imageValue}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              <div className="flex gap-4 items-end justify-center  w-full ">
                <CropSize
                  onRatioSelected={(value: AspectRatioKey) => {
                    if (value === "custom") {
                      console.log("csutom value");
                    } else {
                      setAspectRatio(ASPECT_SIZES_MAPPING[value]);
                    }
                  }}
                />
                <ZoomSlider />
                <Button isIconOnly variant="tertiary">
                  <img src={rotateRight} width={20} height={20} />
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
