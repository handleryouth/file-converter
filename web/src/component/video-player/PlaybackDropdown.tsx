import { Button, Dropdown, Label, type Selection } from "@heroui/react";
import {
  LIST_OF_PLAYBACKRATE_DROPDOWN,
  VIDEO_WIDTH_THRESHOLD,
} from "./VideoOptions";

interface PlaybackDropdownProps {
  onChange: (keys: Selection) => void;
  selectedValue: number;
  dimensions: DOMRect | null;
}

export default function PlaybackDropdown({
  onChange,
  selectedValue,
  dimensions,
}: PlaybackDropdownProps) {
  return (
    <Dropdown>
      <Button
        className={`${(dimensions?.width ?? 0) > VIDEO_WIDTH_THRESHOLD ? "" : "hidden"}`}
        size="sm"
        aria-label="Menu"
        variant="secondary"
      >
        {selectedValue}
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          selectedKeys={selectedValue.toString()}
          selectionMode="single"
          onSelectionChange={onChange}
        >
          {LIST_OF_PLAYBACKRATE_DROPDOWN.map((item) => {
            return (
              <Dropdown.Item key={item.id} id={item.id} textValue={item.value}>
                <Label>{item.text}</Label>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
