import { useCallback, useState } from "react";
import Cropper, { type Area, type CropperProps } from "react-easy-crop";
import { Button, Modal, type Selection } from "@heroui/react";
import CropSize from "./CropSize";
import ZoomSlider from "./ZoomSlider";
import rotateRight from "../../assets/icons/rotate-right.svg";
import { useTranslation } from "../../translations";
import {
  ASPECT_SIZES_MAPPING,
  ROTATE_DEGRESS_PER_CLICK,
  type AspectRatioKey,
} from "./CropOptions";
import CropShape from "./CropShape";

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
  const [rotate, setRotate] = useState(0);

  const [cropShape, setCropShape] = useState<CropperProps["cropShape"]>("rect");

  const resetAllValue = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setAspectRatio(undefined);
    setZoom(1);
    setRotate(0);
  }, []);

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
            <Modal.CloseTrigger onClick={resetAllValue} />
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
                  cropShape={cropShape}
                  rotation={rotate}
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
                <ZoomSlider
                  onChange={(zoom) => {
                    if (typeof zoom === "number") {
                      setZoom(zoom);
                    }
                  }}
                  zoom={zoom}
                />
                <Button
                  isIconOnly
                  onClick={() => {
                    setRotate((rotate) => {
                      const currentRotateAfterIncrement =
                        rotate + ROTATE_DEGRESS_PER_CLICK;
                      if (currentRotateAfterIncrement === 360) {
                        return 0;
                      } else {
                        return currentRotateAfterIncrement;
                      }
                    });
                  }}
                  variant="tertiary"
                >
                  <img src={rotateRight} width={20} height={20} />
                </Button>

                <CropShape
                  onChange={(key: Selection) => {
                    if (key instanceof Set) {
                      const setIterator = key.values();
                      const selectedValue = setIterator.next().value;
                      setCropShape(selectedValue as CropperProps["cropShape"]);
                    }
                  }}
                  selectedValue={cropShape}
                />
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
