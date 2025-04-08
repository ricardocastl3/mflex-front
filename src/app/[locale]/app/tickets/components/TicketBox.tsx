import ContainerBase from "../../cmps/ContainerBase";
import TicketCard from "./TicketCard";

export default function TicketBox() {
  return (
    <ContainerBase>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
       {/*  {Array.from({ length: 8 }).map((_, i) => {
          return (
            <div
              key={i}
              className="h-[30vh] w-full rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
            ></div>
          );
        })} */}
        {Array.from({ length: 20 }).map((_, i) => {
          return <TicketCard key={i} />;
        })}
      </div>
    </ContainerBase>
  );
}
