import { Button } from "@heroui/react";
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import {
  useCallback,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import VideoControls from "./VideoControls";

interface BackdropVideoControlsProps {
  children: ReactNode;
  showControls?: boolean;
  ref: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  handlePlayingVideo: (value: boolean) => void;
  handleSetDuration: (value: number) => void;
}

export default function BackdropVideoControls({
  children,
  showControls = true,
  ref,
  isPlaying,
  currentTime,
  duration,
  handlePlayingVideo,
  handleSetDuration,
}: BackdropVideoControlsProps) {
  const [showBackdrop, setShowbackdrop] = useState(true);
  const timeOutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleTimeoutBackdrop = useCallback(() => {
    timeOutRef.current = setTimeout(() => {
      setShowbackdrop(false);
    }, 3000);
  }, []);

  const handleBackdropPlayPressed = useCallback(() => {
    if (!isPlaying) {
      handleTimeoutBackdrop();
      handlePlayingVideo(true);
      ref.current?.play();
    } else {
      setShowbackdrop(true);
      clearTimeout(timeOutRef.current);
      handlePlayingVideo(false);
      ref.current?.pause();
    }
  }, [handlePlayingVideo, handleTimeoutBackdrop, isPlaying, ref]);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => {
        setShowbackdrop(true);
      }}
      onMouseLeave={handleTimeoutBackdrop}
    >
      {showControls && (
        <div
          className={`absolute w-full h-full  z-2 flex flex-col items-center`}
        >
          <div
            className={`grow flex w-full justify-center items-center bg-black  ${showBackdrop ? "opacity-50" : "opacity-0"}`}
          >
            <Button
              onClick={handleBackdropPlayPressed}
              isIconOnly
              variant="tertiary"
            >
              <img
                src={isPlaying ? pauseIcon : playIcon}
                width={20}
                height={20}
              />
            </Button>
          </div>

          {showBackdrop && (
            <VideoControls
              currentTime={currentTime}
              duration={duration}
              handlePlayingState={handleBackdropPlayPressed}
              handleSetCurrentTime={handleSetDuration}
              isPlaying={isPlaying}
              videoRef={ref}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
}
