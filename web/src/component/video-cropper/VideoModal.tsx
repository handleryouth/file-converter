import { Button, Modal, Separator, Typography } from "@heroui/react";
import { useTranslation } from "../../translations";
import VideoPlayer from "../video-player/VideoPlayer";
import VideoTools from "./VideoTools";

interface VideoModalProps {
  visible: boolean;
  onOpenChange: (isOpen: boolean) => void;
  videoValue: string | undefined;
}

export default function VideoModal({
  videoValue,
  visible,
  onOpenChange,
}: VideoModalProps) {
  const { translate } = useTranslation();
  return (
    <Modal>
      <Modal.Backdrop isOpen={visible} onOpenChange={onOpenChange}>
        <Modal.Container size="cover">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="font-bold text-2xl">
                {translate("common.adjustment")}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex items-center">
              <div className="flex gap-4">
                <div>
                  <Typography.Heading level={3} className="text-center">
                    {translate("common.before")}
                  </Typography.Heading>
                  <VideoPlayer videoUrl={videoValue} />
                </div>

                <Separator orientation="vertical" />

                <div className="text-center">
                  <Typography.Heading level={3} className="text-center">
                    {translate("common.after")}
                  </Typography.Heading>

                  <VideoPlayer videoUrl={videoValue} controlsType="backdrop" />

                  <VideoTools />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
