import HeroPodFlex from "./components/Hero";
import NewsContainer from "./components/container";

export default function PodFlexPage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroPodFlex />
      <NewsContainer />
    </div>
  );
}
