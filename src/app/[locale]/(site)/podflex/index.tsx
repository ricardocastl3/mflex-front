import BannerSite from "../components/BannerSite";
import HeroPodFlex from "./components/Hero";
import PodFlexContainer from "./components/container";

export default function PodFlexPage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroPodFlex route="list" />
      <PodFlexContainer />
      <BannerSite banner={2} />
    </div>
  );
}
