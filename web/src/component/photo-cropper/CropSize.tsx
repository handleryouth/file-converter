import { Dropdown, Button, Label } from "@heroui/react";
import { useTranslation } from "../../translations";
import { LIST_OF_ASPECT_SIZES, type AspectRatioKey } from "./CropOptions";

interface CropSizeProps {
  onRatioSelected: (key: AspectRatioKey) => void;
}

export default function CropSize({ onRatioSelected }: CropSizeProps) {
  const { translate } = useTranslation();
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        {translate("common.aspectRatio")}
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          onAction={(key) => onRatioSelected(key as AspectRatioKey)}
        >
          {LIST_OF_ASPECT_SIZES.map((item) => {
            return (
              <Dropdown.Item id={item.id} textValue={item.value}>
                <Label>{item.text}</Label>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
