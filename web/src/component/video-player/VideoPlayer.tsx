import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import BackdropVideoControls from "./BackdropVideoControls";
import VideoControls from "./VideoControls";
import { useElementDimensions } from "../../hooks";
import type { CustomPlayingVideoMetadata } from "./VideoOptions";

interface VideoPlayerProps {
  videoUrl: string | undefined;
  showControls?: boolean;
  controlsType?: "backdrop" | "bottom";
  videoProps?: Omit<
    ComponentPropsWithoutRef<"video">,
    "onTimeUpdate" | "onLoadedMetadata" | "onEnded"
  >;
  containerClassName?: string;
  onVideoMetadataUpdate?: (value: number) => void;
  playingMetaData?: CustomPlayingVideoMetadata;
}

export default function VideoPlayer({
  videoUrl,
  showControls = true,
  controlsType = "bottom",
  videoProps,
  containerClassName,
  onVideoMetadataUpdate,
  playingMetaData,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const { ref, dimensions } = useElementDimensions();

  useEffect(() => {
    if (playingMetaData !== undefined && videoRef.current !== null) {
      videoRef.current.currentTime = playingMetaData.start;
    }
  }, [playingMetaData]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      onVideoMetadataUpdate?.(videoRef.current.duration);
    }
  }, [onVideoMetadataUpdate]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const renderVideoPlayer = useMemo(() => {
    return (
      <video
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        ref={videoRef}
        {...videoProps}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }, [
    handleEnded,
    handleLoadedMetadata,
    handleTimeUpdate,
    videoProps,
    videoUrl,
  ]);

  return (
    <div className={`mx-auto ${containerClassName}`} ref={ref}>
      {controlsType === "backdrop" ? (
        <BackdropVideoControls
          dimensions={dimensions}
          isPlaying={isPlaying}
          handlePlayingVideo={setIsPlaying}
          ref={videoRef}
          showControls={showControls}
          currentTime={currentTime}
          duration={duration}
          handleSetDuration={setDuration}
        >
          {renderVideoPlayer}
        </BackdropVideoControls>
      ) : (
        <div>{renderVideoPlayer}</div>
      )}
      {showControls && controlsType === "bottom" && (
        <VideoControls
          dimensions={dimensions}
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          videoRef={videoRef}
          handlePlayingState={setIsPlaying}
          handleSetCurrentTime={setDuration}
        />
      )}
    </div>
  );
}
