import type { ListDropdown } from "../../types";


export interface CustomPlayingVideoMetadata {
  start: number;
  end: number;
}

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

export const VIDEO_WIDTH_THRESHOLD = 100;

export function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function formatDurationInPercent(
  timeInSeconds: number,
  totalLength: number,
) {
  const percentage = (timeInSeconds / totalLength) * 100;
  return percentage;
}
