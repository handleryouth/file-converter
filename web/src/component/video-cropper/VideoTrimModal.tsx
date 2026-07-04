import { useTranslation } from "../../translations";
import { VideoPlayer } from "../video-player";
import { Button, Modal } from "@heroui/react";
import VideoTimeline from "./VideoTimelineSlider";
import { useRef, useState } from "react";

interface VideoTrimModalProps {
  videoValue: string | undefined;
  visible: boolean;
  onOpenChange: () => void;
}

export default function VideoTrimModal({
  videoValue,
  visible,
  onOpenChange,
}: VideoTrimModalProps) {
  const { translate } = useTranslation();
  const originalDuration = useRef<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const [timeLineValue, setTimelineValue] = useState<number[]>([0, 0]);

  return (
    <Modal>
      <Modal.Backdrop isOpen={visible} onOpenChange={onOpenChange}>
        <Modal.Container size="lg">
          <Modal.Dialog>
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="font-bold text-xl">
                {translate("common.trim")}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <VideoPlayer
                onVideoMetadataUpdate={(value) => {
                  setDuration(value);
                  setTimelineValue([0, value]);
                  originalDuration.current = value;
                }}
                videoUrl={videoValue}
                controlsType="backdrop"
                showControls={false}
              />
              <VideoTimeline
                onTimelineTimeValue={(value) => {
                  const checkIfArray = Array.isArray(value);
                  if (checkIfArray) {
                    setTimelineValue(value);
                  }
                }}
                timelineValue={timeLineValue}
                duration={duration}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button fullWidth>{translate("common.buttons.save")}</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
