import { useCallback, useState, type RefObject } from "react";
import { Button } from "@heroui/react";
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import volumeMuted from "../../assets/icons/volume-muted.svg";
import volumeOn from "../../assets/icons/volume-on.svg";
import PlaybackDropdown from "./PlaybackDropdown";
import VideoTimer from "./VideoTimer";

interface VideoControlProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  currentTime: number;
  duration: number;
  handlePlayingState: (value: boolean) => void;
  isPlaying: boolean;
  handleSetCurrentTime: (value: number) => void;
}

function convertToVideoLength(position: number, totalDuration: number) {
  const durationFromPercentage = Math.floor((position / 100) * totalDuration);
  console.log("duration from percentage", durationFromPercentage);
  return durationFromPercentage;
}

export default function VideoControls({
  videoRef,
  currentTime,
  duration,
  handlePlayingState,
  isPlaying,
  handleSetCurrentTime,
}: VideoControlProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handlePlayingVideo = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
      handlePlayingState(false);
    } else {
      videoRef.current?.play();
      handlePlayingState(true);
    }
  }, [handlePlayingState, isPlaying, videoRef]);

  const handleMuteVideo = useCallback(() => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  }, [isMuted, videoRef]);

  const handleForward = useCallback(
    (leap: number, type: "forward" | "backward") => {
      if (videoRef.current) {
        if (type === "forward") {
          videoRef.current.currentTime += leap;
        } else {
          videoRef.current.currentTime -= leap;
        }
      }
    },
    [videoRef],
  );

  return (
    <div className="flex w-full items-center bg-gray-400 p-2 gap-4">
      <div className="flex items-center gap-4 ">
        <Button isIconOnly onClick={handlePlayingVideo} variant="tertiary">
          <img src={isPlaying ? pauseIcon : playIcon} width={20} height={20} />
        </Button>

        <Button
          isIconOnly
          onClick={() => handleForward(10, "backward")}
          variant="tertiary"
        >
          -10
        </Button>

        <Button
          isIconOnly
          onClick={() => handleForward(10, "forward")}
          variant="tertiary"
        >
          +10
        </Button>
      </div>

      <VideoTimer
        onSliderPressed={(value) => {
          const convertTime = convertToVideoLength(value, duration);
          handleSetCurrentTime(convertTime);
          if (videoRef.current) {
            videoRef.current.currentTime = convertTime;
          }
        }}
        currentTime={currentTime}
        duration={duration}
      />

      <div className="flex items-center gap-4">
        <Button isIconOnly onClick={handleMuteVideo} variant="tertiary">
          <img src={isMuted ? volumeOn : volumeMuted} width={20} height={20} />
        </Button>

        <PlaybackDropdown
          onChange={(key) => {
            if (key instanceof Set) {
              const setIterator = key.values();
              const selectedValue = setIterator.next().value as string;
              if (selectedValue !== undefined) {
                const integerPlaybackRate = parseInt(selectedValue);
                setPlaybackRate(integerPlaybackRate);
                if (videoRef.current) {
                  videoRef.current.playbackRate = integerPlaybackRate;
                }
              }
            }
          }}
          selectedValue={playbackRate}
        />
      </div>
    </div>
  );
}
