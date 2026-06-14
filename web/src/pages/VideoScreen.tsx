import { useTranslation } from "../translations";
import { useEffect, useRef, useState } from "react";
import { InputFile, VideoModal } from "../component";
import { FFmpeg } from "@ffmpeg/ffmpeg";

export default function VideoScreen() {
  const { translate } = useTranslation();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState(false);
  const [showCrop, setShowCrop] = useState(false);
  const [videoInput, setVideoInput] = useState<string>();

  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    const loadWasm = async () => {
      const ffmpeg = ffmpegRef.current;

      // Hook up an event listener to stream real-time logs to your browser console
      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });

      setReady(true);
    };
    loadWasm();
  }, []);

  if (!ready) {
    return (
      <div className="loading">Loading Video Processing Engine (WASM)...</div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <InputFile
        containerClassName="flex flex-col items-center justify-center"
        label={{
          children: translate("input.putVideo"),
          htmlFor: "input-video",
        }}
        input={{
          id: "input-video",
          type: "file",
          accept: "video/*",
          ref: inputFileRef,
          onChange: (value) => {
            setShowCrop(true);
            const file = value.target.files?.[0];

            if (file) {
              const urlInput = URL.createObjectURL(file);
              setVideoInput(urlInput);
            }
          },
        }}
        buttonProps={{
          onClick: () => {
            inputFileRef.current?.click();
          },
        }}
      />

      <VideoModal
        videoValue={videoInput}
        visible={showCrop}
        onOpenChange={setShowCrop}
      />
    </div>
  );
}
