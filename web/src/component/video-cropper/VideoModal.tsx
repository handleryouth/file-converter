import { Button, Modal } from "@heroui/react";
import { useTranslation } from "../../translations";
import VideoPlayer from "../video-player/VideoPlayer";

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
            <Modal.Body>
              <VideoPlayer videoUrl={videoValue} />
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
