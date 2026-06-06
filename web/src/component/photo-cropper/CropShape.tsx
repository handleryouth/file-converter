import { Dropdown, Button, Label, type Selection } from "@heroui/react";
import { LIST_OF_SHAPE_DROPDOWN } from "./CropOptions";
import { useTranslation } from "../../translations";
import type { CropperProps } from "react-easy-crop";

interface CropShapeProps {
  onChange: (keys: Selection) => void;
  selectedValue: CropperProps["cropShape"];
}

export default function CropShape({ onChange, selectedValue }: CropShapeProps) {
  const { translate } = useTranslation();
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        {translate("common.shape")}
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          selectedKeys={selectedValue}
          selectionMode="single"
          onSelectionChange={onChange}
        >
          {LIST_OF_SHAPE_DROPDOWN.map((item) => {
            return (
              <Dropdown.Item key={item.id} id={item.id} textValue={item.value}>
                <Label>{translate(item.text)}</Label>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
