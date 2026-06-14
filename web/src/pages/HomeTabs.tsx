import { Tabs } from "@heroui/react";
import ImageScreen from "./ImageScreen";
import VideoScreen from "./VideoScreen";
import { useTranslation } from "../translations";

export default function HomeTabs() {
  const { translate } = useTranslation();
  return (
    <Tabs className="w-full">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab id="image">
            {translate("common.image")}
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="video">
            {translate("common.video")}
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>

      <Tabs.Panel className="pt-4 h-full" id="image">
        <ImageScreen />
      </Tabs.Panel>
      <Tabs.Panel className="pt-4 h-full" id="video">
        <VideoScreen />
      </Tabs.Panel>
    </Tabs>
  );
}
