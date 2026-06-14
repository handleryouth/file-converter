import { Button, Dropdown, Label, type Selection } from "@heroui/react";
import React from "react";
import { LIST_OF_PLAYBACKRATE_DROPDOWN } from "./VideoOptions";

interface PlaybackDropdownProps {
  onChange: (keys: Selection) => void;
  selectedValue: number;
}

export default function PlaybackDropdown({
  onChange,
  selectedValue,
}: PlaybackDropdownProps) {
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
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
