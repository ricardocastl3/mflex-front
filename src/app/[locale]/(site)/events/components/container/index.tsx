"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useCallback, useEffect, useState } from "react";
import { useCategoryProvider } from "@/providers/features/CategoryProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import EventCard from "./EventCard";
import BoxCategories from "../../../components/BoxCategories";
import useEvents from "@/hooks/api/useEvents";

export default function EventContainer() {
  // Contexts
  const {
    allEvents,
    hasMoreEvents,
    isLoadingMoreEvents,
    handleLoadMore,
    handleSeachByName,
    isLoadingAllEvents,
  } = useEvents({ route: "public" });
  const { selectedCategory } = useCategoryProvider();

  // Controls
  const getItemIndex = (i: number) => {
    return i % 4; // Retorna 0, 1, 2 ou 3 ciclicamente
  };

  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    if (
      !hasMoreEvents ||
      isLoadingAllEvents ||
      isLoadingMoreEvents ||
      (!isLoadingMoreEvents && !hasMoreEvents)
    )
      return;

    let isLoading = false; // Controle para evitar chamadas repetidas

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;

      const height = window.innerWidth > 765 ? 1000 : 800;

      if (scrollTop + clientHeight >= scrollHeight - height && !isLoading) {
        isLoading = true; // Marcar como carregando
        setTimeout(async () => {
          await handleLoadMore({
            category_id: selectedCategory?.id,
            name: searchField,
          });
          isLoading = false; // Resetar após a chamada
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMoreEvents, isLoadingAllEvents]);

  return (
    <div className="flex flex-col gap-5 relative h-full items-stretch w-full md:pb-28 pb-12">
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
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value),
              handleSeachByName({
                name: e.target.value,
                category_id: selectedCategory?.id,
              });
          }}
          placeholder="Ex: WorkShop de Segurança da Informação"
          weight={"lg"}
          className="rounded-full md:text-lg text-base text-center dark:bg-ausoft-slate-950 bg-slate-100 md:w-[50vw] w-[90vw]"
        />
      </div>

      <BoxCategories
        view="events"
        callback={(e) => {
          handleSeachByName({
            name: searchField,
            category_id: e,
          });
        }}
      />

      <div className="flex flex-col md:px-[3rem] px-5">
        {!isLoadingAllEvents && allEvents.length > 0 && (
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            {allEvents.map((event, i) => {
              const currentIndex = getItemIndex(i);
              return <EventCard key={i} index={currentIndex} event={event} />;
            })}

            {isLoadingMoreEvents && (
              <>
                {Array.from({ length: 4 }).map((event, i) => {
                  return (
                    <div
                      key={i}
                      className="p-8 h-[80vh] rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
                    ></div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {isLoadingAllEvents && (
          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
            {Array.from({ length: 4 }).map((event, i) => {
              return (
                <div
                  key={i}
                  className="p-8 h-[80vh] rounded-xl bg-slate-300/40 dark:bg-ausoft-slate-900 animate-pulse"
                ></div>
              );
            })}
          </div>
        )}
      </div>

      {!isLoadingAllEvents && !isLoadingMoreEvents && allEvents.length <= 0 && (
        <div className="w-full h-full flex justify-center py-12 md:px-[3rem] px-5 flex-col">
          <AuSoftUI.Component.ListEmpty
            action_en=""
            action_pt=""
            action_url=""
            description_en="Mo available events"
            description_pt="Sem eventos disponíveis"
            title_en="No Events"
            title_pt="Sem eventos"
            hasAction={false}
          />
        </div>
      )}
    </div>
  );
}
