import { Slider, Label } from "@heroui/react";
import { useTranslation } from "../../translations";

interface ZoomSliderProps {
  zoom: number;
  onChange: (value: number | number[]) => void;
}

export default function ZoomSlider({ zoom, onChange }: ZoomSliderProps) {
  const { translate } = useTranslation();
  return (
    <Slider
      className="w-32 "
      value={zoom}
      onChange={onChange}
      maxValue={100}
      minValue={1}
    >
      <Label>{translate("common.zoom")}</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
