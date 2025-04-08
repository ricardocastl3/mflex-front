import ContainerBase from "../../cmps/ContainerBase";
import EventCard from "./EventCard";

export default function EventBox() {
  return (
    <ContainerBase>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {/* {Array.from({ length: 8 }).map((_, i) => {
          return (
            <div
              key={i}
              className="h-[50vh] w-full rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
            ></div>
          );
        })} */}

        {Array.from({ length: 8 }).map((_, i) => {
          return <EventCard key={i} />;
        })}
      </div>
    </ContainerBase>
  );
}
