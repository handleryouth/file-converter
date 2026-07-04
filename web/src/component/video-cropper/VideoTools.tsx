import { Button, Tooltip } from "@heroui/react";
import trimIcon from "../../assets/icons/trim.svg";
import volumeMuted from "../../assets/icons/volume-muted.svg";
import volumeOn from "../../assets/icons/volume-on.svg";
import rotateRight from "../../assets/icons/rotate-right.svg";
import rotateLeft from "../../assets/icons/rotate-left.svg";
import cut from "../../assets/icons/cut.svg";
import { useTranslation } from "../../translations";
import PlaybackDropdown from "../video-player/PlaybackDropdown";
import { useState } from "react";
import VideoTrimModal from "./VideoTrimModal";

interface VideoToolsModal {
  videoValue: string | undefined;
  dimensions: DOMRect | null;
}

export default function VideoTools({
  videoValue,
  dimensions,
}: VideoToolsModal) {
  const { translate } = useTranslation();
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTrimModal, setShowTrimModal] = useState(false);

  return (
    <div className="flex items-center gap-4 w-full justify-center my-4">
      <VideoTrimModal
        onOpenChange={() => setShowTrimModal(false)}
        videoValue={videoValue}
        visible={showTrimModal}
      />
      <Tooltip delay={0}>
        <Button
          isIconOnly
          onClick={() => setShowTrimModal(true)}
          variant="secondary"
        >
          <img src={cut} width={20} height={20} />
        </Button>

        <Tooltip.Content>
          <p>{translate("common.cut")}</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button isIconOnly variant="secondary">
          <img src={trimIcon} width={20} height={20} />
        </Button>

        <Tooltip.Content>
          <p>{translate("common.trim")}</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button
          onClick={() => {
            setIsMuted((prevState) => !prevState);
          }}
          isIconOnly
          variant="secondary"
        >
          <img src={isMuted ? volumeOn : volumeMuted} width={20} height={20} />
        </Button>

        <Tooltip.Content>
          <p>{translate(isMuted ? "common.unmute" : "common.mute")}</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <PlaybackDropdown
          dimensions={dimensions}
          onChange={(key) => {
            if (key instanceof Set) {
              const setIterator = key.values();
              const selectedValue = setIterator.next().value as string;
              if (selectedValue !== undefined) {
                const integerPlaybackRate = parseInt(selectedValue);
                setPlaybackRate(integerPlaybackRate);
              }
            }
          }}
          selectedValue={playbackRate}
        />

        <Tooltip.Content>
          <p>{translate("common.playbackRate")}</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button isIconOnly variant="secondary">
          <img src={rotateLeft} width={20} height={20} />
        </Button>

        <Tooltip.Content>
          <p>{translate("common.rotateLeft")}</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button isIconOnly variant="secondary">
          <img src={rotateRight} width={20} height={20} />
        </Button>

        <Tooltip.Content>
          <p>{translate("common.rotateRight")}</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
