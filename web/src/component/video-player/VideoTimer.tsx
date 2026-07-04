import { Slider } from "@heroui/react";
import { formatDurationInPercent, formatTime } from "./VideoOptions";

interface VideoTimerProps {
  duration: number;
  currentTime: number;
  onSliderPressed: (value: number) => void;
}

export default function VideoTimer({
  onSliderPressed,
  currentTime,
  duration,
}: VideoTimerProps) {
  return (
    <div className=" flex-1 flex items-center gap-4 w-full">
      <div className="text-xs text-white sm:text-sm">
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(duration)}</span>
      </div>

      <Slider
        className="w-full"
        maxValue={100}
        minValue={0}
        step={1}
        value={formatDurationInPercent(currentTime, duration)}
        onChange={(value) => {
          if (typeof value === "number") {
            onSliderPressed(value);
          }
        }}
        defaultValue={formatDurationInPercent(currentTime, duration)}
      >
        <Slider.Track className="h-4 rounded-full bg-surface-secondary">
          <Slider.Fill />
          <Slider.Thumb className="size-4 rounded-full bg-gray-300" />
        </Slider.Track>
      </Slider>
    </div>
  );
}
