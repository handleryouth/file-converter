import { useCallback, useMemo, useRef, useState } from "react";
import BackdropVideoControls from "./BackdropVideoControls";
import VideoControls from "./VideoControls";

interface VideoPlayerProps {
  videoUrl: string | undefined;
  showControls?: boolean;
  controlsType?: "backdrop" | "bottom";
}

export default function VideoPlayer({
  videoUrl,
  showControls = true,
  controlsType = "bottom",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

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
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }, [handleEnded, handleTimeUpdate, videoUrl]);

  return (
    <div className="max-w-full w-1/2 mx-auto">
      {controlsType === "backdrop" ? (
        <BackdropVideoControls
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
