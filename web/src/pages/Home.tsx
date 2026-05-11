import { Seo } from "../component";
import HomeTabs from "./HomeTabs";

export default function Home() {
  return (
    <>
      <Seo title="Home" description="Home" />
      <HomeTabs />
    </>
  );
}
