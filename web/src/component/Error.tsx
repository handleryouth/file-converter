import LottiePlayer from "./LottiePlayer";
import { useTranslation } from "../translations";
import { Button, Typography } from "@heroui/react";

export default function Error() {
  const { translate } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-screen">
      <LottiePlayer
        animation="failedMail"
        playerOptions={{
          className: "w-48",
        }}
      />
      <Typography.Heading level={3}>
        {translate("error.error")}
      </Typography.Heading>
      <Typography.Paragraph>
        {translate("error.somethingWentWrong")}
      </Typography.Paragraph>
      <Button onClick={() => window.location.reload()}>
        {translate("action.refresh")}
      </Button>
    </div>
  );
}
