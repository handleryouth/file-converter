import { Slider, Label } from "@heroui/react";
import { useTranslation } from "../../translations";

export default function ZoomSlider() {
  const { translate } = useTranslation();
  return (
    <Slider className="w-32 " defaultValue={30}>
      <Label>{translate("common.zoom")}</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
