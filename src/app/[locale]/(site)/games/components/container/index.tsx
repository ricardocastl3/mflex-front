"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useState } from "react";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { addDays, subDays } from "date-fns";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useFixtures from "@/hooks/api/useFootball";
import TradingLeagues from "./TradingLeagues";

export default function NewsContainer() {
  // Contexts
  const { isLoadingAllFixtures, handleSeachByName, allFixtures } =
    useFixtures();

  const [searchField, setSearchField] = useState("");

  const [selectedDate, setSelectedDate] = useState("today");

  return (
    <div className="flex flex-col gap-5 relative md:mb-28 mb-12">
      <div className="z-20 flex w-full items-center justify-center absolute -top-24 flex-col gap-4">
        <div className="w-full justify-center text-center">
          <h4 className="text-white font-bold md:text-2xl text-xl">
            <CTranslateTo
              eng="Your Favourite Games ⚽"
              pt="Seus Jogos Favoritos ⚽"
            />
          </h4>
        </div>
      </div>

      {isLoadingAllFixtures && (
        <div className="flex flex-col gap-4 md:m-12 m-6">
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <div
                key={i}
                className="bg-white rounded-xl animate-pulse dark:bg-slate-800/50 p-8"
              ></div>
            );
          })}
        </div>
      )}

      {!isLoadingAllFixtures && allFixtures.length <= 0 && (
        <div className="md:mt-24 mt-8 md:mb-8 mb-4">
          <AuSoftUI.Component.ListEmpty
            hasAction
            action_en="Go to PodCasts"
            action_pt="Ver PodCasts"
            action_url="podflex"
            description_en="It looks like we couldn't get the games for you, while we sort it out, how about checking out the podcasts?"
            description_pt="Parece que não conseguimos pegar os jogos para você, enquanto resolvemos, que tal aproveitar ver os podcasts?"
            title_en="No Available Games"
            title_pt="Sem Jogos Disponíveis"
          />
        </div>
      )}

      {!isLoadingAllFixtures && allFixtures.length > 0 && (
        <div className="md:m-12 m-4 flex flex-col gap-4">
          <BaseBox className="p-4">
            <div className="flex items-center gap-4">
              <AuSoftUI.UI.Button
                onClick={() => {
                  setSelectedDate("yesterday");
                  handleSeachByName({
                    date: subDays(new Date(), 1).toISOString(),
                  });
                }}
                variant={selectedDate == "yesterday" ? "primary" : "outline"}
                className="items-center md:w-fit w-full justify-center"
              >
                <ReactIcons.CgIcon.CgCalendar size={15} />
                <CTranslateTo eng="Yesterday" pt="Ontem" />
              </AuSoftUI.UI.Button>
              <AuSoftUI.UI.Button
                onClick={() => {
                  setSelectedDate("today");
                  handleSeachByName({
                    date: new Date().toISOString(),
                  });
                }}
                variant={selectedDate == "today" ? "primary" : "outline"}
                className="items-center md:w-fit w-full justify-center"
              >
                <ReactIcons.CgIcon.CgCalendar size={15} />
                <CTranslateTo eng="Today" pt="Hoje" />
              </AuSoftUI.UI.Button>
              <AuSoftUI.UI.Button
                onClick={() => {
                  setSelectedDate("tomorrow");
                  handleSeachByName({
                    date: addDays(new Date(), 1).toISOString(),
                  });
                }}
                variant={selectedDate == "tomorrow" ? "primary" : "outline"}
                className="items-center md:w-fit w-full justify-center"
              >
                <ReactIcons.CgIcon.CgCalendar size={15} />
                <CTranslateTo eng="Tomorrow" pt="Amanhã" />
              </AuSoftUI.UI.Button>
            </div>
          </BaseBox>
          <TradingLeagues leagues={allFixtures} />
        </div>
      )}
    </div>
  );
}
