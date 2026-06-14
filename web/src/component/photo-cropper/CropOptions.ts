import type { StrictTranslationPath } from "../../translations";
import type { ListDropdown } from "../../types";

export type AspectRatioKey = "1/1" | "9/16" | "16/9" | "4/3" | "custom";

export const ROTATE_DEGRESS_PER_CLICK = 90;

export type AspectSizesMapping = Omit<Record<AspectRatioKey, number>, "custom">;

export const ASPECT_SIZES_MAPPING: AspectSizesMapping = {
  "1/1": 1 / 1,
  "16/9": 16 / 9,
  "4/3": 4 / 3,
  "9/16": 9 / 16,
};

export const LIST_OF_ASPECT_SIZES: ListDropdown<string, AspectRatioKey>[] = [
  {
    id: "1/1",
    text: "1:1",
    value: "1/1",
  },
  {
    id: "9/16",
    text: "9:16",
    value: "9/16",
  },
  {
    id: "16/9",
    text: "16:9",
    value: "16/9",
  },
  {
    id: "4/3",
    text: "4/3",
    value: "4/3",
  },
  {
    id: "custom",
    text: "Custom",
    value: "Custom",
  },
];

export const LIST_OF_SHAPE_DROPDOWN = [
  {
    id: "rect",
    text: "common.rectangle",
    value: "rectangle",
  },

  {
    id: "round",
    text: "common.circle",
    value: "round",
  },
] as const satisfies ListDropdown<StrictTranslationPath>[];
