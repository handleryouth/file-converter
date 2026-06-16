import { useTranslation } from "../../translations";
import { VideoPlayer } from "../video-player";
import { Button } from "@heroui/react";

interface VideoTrimModalProps {
  videoValue: string | undefined;
}

export default function VideoTrimModal({ videoValue }: VideoTrimModalProps) {
  const { translate } = useTranslation();
  return (
    <div>
      <VideoPlayer videoUrl={videoValue} />
      <Button>{translate("common.buttons.save")}</Button>
    </div>
  );
}
