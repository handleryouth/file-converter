import { useCallback, useRef, useState } from "react";
import { Button } from "@heroui/react";
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import volumeMuted from "../../assets/icons/volume-muted.svg";
import volumeOn from "../../assets/icons/volume-on.svg";
import PlaybackDropdown from "./PlaybackDropdown";
import VideoTimer from "./VideoTimer";

interface VideoPlayerProps {
  videoUrl: string | undefined;
}

function convertToVideoLength(position: number, totalDuration: number) {
  const durationFromPercentage = Math.floor((position / 100) * totalDuration);
  console.log("duration from percentage", durationFromPercentage);
  return durationFromPercentage;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [currentTime, setCurrentTime] = useState<number>(0);

  const [duration, setDuration] = useState<number>(0);

  const handlePlayingVideo = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

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
  }, [isMuted]);

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
    [],
  );

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="max-w-full w-1/2 mx-auto">
      <video
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        ref={videoRef}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex w-full items-center bg-gray-400 p-2 gap-4">
        <div className="flex items-center gap-4 ">
          <Button isIconOnly onClick={handlePlayingVideo} variant="tertiary">
            <img
              src={isPlaying ? pauseIcon : playIcon}
              width={20}
              height={20}
            />
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
            setCurrentTime(convertTime);
            if (videoRef.current) {
              videoRef.current.currentTime = convertTime;
            }
          }}
          currentTime={currentTime}
          duration={duration}
        />

        <div className="flex items-center gap-4">
          <Button isIconOnly onClick={handleMuteVideo} variant="tertiary">
            <img
              src={isMuted ? volumeOn : volumeMuted}
              width={20}
              height={20}
            />
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
    </div>
  );
}
