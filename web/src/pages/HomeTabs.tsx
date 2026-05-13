import { Tabs } from "@heroui/react";
import ImageScreen from "./ImageScreen";
import VideoScreen from "./VideoScreen";

export default function HomeTabs() {
  return (
    <Tabs className="w-full">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab id="image">
            Image
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="video">
            Video
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>

      <Tabs.Panel className="pt-4 h-full" id="image">
        <ImageScreen />
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="video">
        <VideoScreen />
      </Tabs.Panel>
    </Tabs>
  );
}
