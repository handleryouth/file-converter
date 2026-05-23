import { Label, ListBox, Select } from "@heroui/react";
import {
  Fragment,
  useMemo,
  type ComponentProps,
  type Key,
  type ReactNode,
} from "react";

interface CustomSelectProps<T> {
  label?: ComponentProps<typeof Label>;
  selectProps?: Omit<ComponentProps<typeof Select>, "children">;
  items: T[];
  extractId: (items: T) => Key;
  itemsRender: (items: T) => ReactNode;
}

export default function CustomSelect<T>({
  items,
  itemsRender,
  label,
  extractId,
  selectProps,
}: CustomSelectProps<T>) {
  const renderItem = useMemo(() => {
    return items.map((item) => (
      <Fragment key={extractId(item)}>{itemsRender(item)}</Fragment>
    ));
  }, [extractId, items, itemsRender]);
  return (
    <Select {...selectProps}>
      {label !== undefined && <Label {...label} />}
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>{renderItem}</ListBox>
      </Select.Popover>
    </Select>
  );
}
