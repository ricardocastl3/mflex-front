import HeroEvents from "./components/Hero";
import EventContainer from "./components/container";

export default function EventPage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroEvents />
      <EventContainer />
    </div>
  );
}
