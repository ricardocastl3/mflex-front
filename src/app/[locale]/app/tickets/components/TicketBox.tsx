import ContainerBase from "../../cmps/ContanerBase";
import TicketCard from "./TicketCard";

export default function TicketBox() {
  return (
    <ContainerBase>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {Array.from({ length: 20 }).map((_, i) => {
          return <TicketCard key={i} />;
        })}
      </div>
    </ContainerBase>
  );
}
