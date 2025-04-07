import HeroPodFlex from "./components/_Hero";
import PodFlexContainer from "./components/container/_index";

export default function PodFlexPage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroPodFlex />
      <PodFlexContainer />
    </div>
  );
}
