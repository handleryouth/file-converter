import Lottie, { useLottie } from "lottie-react";
import mobileVideo from "../assets/lottie/mobile-video.json";
import smartphoneLock from "../assets/lottie/smartphone-lock.json";
import smartphoneFolder from "../assets/lottie/smartphone-folder.json";
import note from "../assets/lottie/note.json";
import phoneGallery from "../assets/lottie/phone-gallery.json";
import failedMail from "../assets/lottie/failed-mail.json";
import type { ComponentProps } from "react";

const mappedAnimation = {
  mobileVideo: mobileVideo,
  smartphoneLock: smartphoneLock,
  note,
  phoneGallery,
  smartphoneFolder,
  failedMail,
} as const;

interface LottiePlayerProps {
  animation: keyof typeof mappedAnimation;
  playerOptions?: Omit<ComponentProps<typeof Lottie>, "animationData">;
}

export default function LottiePlayer({
  animation,
  playerOptions,
}: LottiePlayerProps) {
  const animationData = mappedAnimation[animation];
  const options = {
    animationData: animationData,
    loop: true,
    ...playerOptions,
  };
  const { View } = useLottie(options);
  return View;
}
