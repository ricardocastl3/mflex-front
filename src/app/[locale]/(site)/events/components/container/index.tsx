import { AuSoftUI } from "@/@components/(ausoft)";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import EventCard from "./EventCard";
import BoxCategories from "../../../components/BoxCategories";

export default function EventContainer() {
  return (
    <div className="flex flex-col gap-5 relative max-w-full md:mb-28 mb-12">
      <div className="z-20 flex w-full items-center justify-center absolute -top-24 flex-col gap-4">
        <div className="w-full justify-center text-center">
          <h4 className="text-white font-bold md:text-2xl text-xl">
            <CTranslateTo
              eng="Unmissable Events 🌟"
              pt="Eventos Imperdíveis 🌟"
            />
          </h4>
        </div>
        <AuSoftUI.UI.TextField.Default
          placeholder="Ex: Fly PodCast...."
          weight={"lg"}
          className="rounded-full text-lg text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
        />
      </div>

      <BoxCategories />

      <div className="flex flex-col md:px-[3rem] px-5">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          {Array.from({ length: 8 }).map((_, i) => {
            return (
              <EventCard
                key={i}
                event={{
                  id: "djff",
                  amount: 0,
                  created_at: new Date(),
                  description: "",
                  main_address: "Luanda",
                  reference_address: "Mundo de Casa - Royal Park",
                  map_location: "",
                  start_at: new Date(),
                  title: "2ª Edição – Festa dos Pequeninos",
                  category: {
                    name: "Artes & Teatro",
                    created_at: new Date(),
                    description: "Nova categoria",
                    id: "dsdsd",
                  },
                  organizer: {
                    first_name: "Studio -",
                    last_name: "Boa Vida",
                  },
                  image_url:
                    "https://images.pexels.com/photos/1860618/pexels-photo-1860618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
