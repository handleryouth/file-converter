import { Slider } from "@heroui/react";

interface VideoTimelineProps {
  duration: number;
  onTimelineTimeValue: (value: number[] | number) => void;
  timelineValue: number[];
}

export default function VideoTimeline({
  duration,
  onTimelineTimeValue,
  timelineValue,
}: VideoTimelineProps) {
  return (
    <Slider
      key={duration}
      className="w-full "
      formatOptions={{ style: "unit", unit: "second", unitDisplay: "short" }}
      maxValue={duration}
      minValue={0}
      value={timelineValue}
      onChange={onTimelineTimeValue}
    >
      <Slider.Output />
      <Slider.Track>
        {({ state }) => (
          <>
            <Slider.Fill />
            {state.values.map((_, i) => (
              <Slider.Thumb key={i} index={i} />
            ))}
          </>
        )}
      </Slider.Track>
    </Slider>
  );
}
