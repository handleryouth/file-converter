import type { ListDropdown } from "../../types";

export const LIST_OF_PLAYBACKRATE_DROPDOWN = [
  {
    id: "1",
    text: "1x",
    value: "1",
  },
  {
    id: "3",
    text: "3x",
    value: "3",
  },
  {
    id: "5",
    text: "5x",
    value: "5",
  },
] as const satisfies ListDropdown[];
