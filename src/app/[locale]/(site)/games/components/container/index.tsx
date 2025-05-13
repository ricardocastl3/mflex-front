"use client";

import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState } from "react";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { addDays, addHours, subDays } from "date-fns";
import { useFootballProvider } from "@/providers/features/FootballProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useFixtures from "@/hooks/api/football/useFootball";
import TradingLeagues from "./TradingLeagues";
import FootballLeagueDropdown from "../leagues/dropdowns/league";
import FootballTeamDropdown from "../leagues/dropdowns/team";

export default function NewsContainer() {
  // Contexts
  const { isLoadingAllFixtures, handleSeachByName, allFixtures } =
    useFixtures();

  const {
    selectedFootballAPILeague,
    handleSelectedFootballAPITeam,
    handleSelectedFootballAPILeague,
  } = useFootballProvider();

  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedDateInput, setSelectedDateInput] = useState("");

  function handleCleanFilter() {
    setSelectedDate("today");
    setSelectedDateInput("");
    handleSelectedFootballAPITeam(undefined);
    handleSelectedFootballAPILeague(undefined);
    handleSeachByName({
      date: addHours(new Date(), 1).toISOString(),
    });
  }

  function handleButtonSelectedDate(datePars: string) {
    setSelectedDate(datePars);
    setSelectedDateInput("");

    const date =
      datePars == "today"
        ? new Date().toISOString()
        : selectedDate == "tomorow"
        ? addDays(new Date(), 1)
        : subDays(new Date(), 1).toISOString();

    handleSeachByName({
      date,
      leagueId: selectedFootballAPILeague
        ? selectedFootballAPILeague.league_id
        : undefined,
    });
  }

  function handleDateTextField(dateValue: string) {
    setSelectedDate("");
    setSelectedDateInput(dateValue);
    handleSeachByName({
      date: new Date(dateValue).toISOString(),
      leagueId: selectedFootballAPILeague
        ? selectedFootballAPILeague.league_id
        : undefined,
    });
  }

  useEffect(() => {
    const date =
      selectedDate == "today"
        ? new Date().toISOString()
        : selectedDate == "tomorow"
        ? addDays(new Date(), 1)
        : subDays(new Date(), 1).toISOString();

    if (selectedFootballAPILeague) {
      handleSeachByName({
        date: selectedDateInput != "" ? selectedDateInput : date,
        leagueId: selectedFootballAPILeague.league_id,
      });
    } else {
      handleSeachByName({
        date: selectedDateInput != "" ? selectedDateInput : date,
      });
    }
  }, [selectedFootballAPILeague]);

  return (
    <div className="flex flex-col gap-3 relative md:mb-28 mb-12">
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

      <div className="md:mx-12 mx-4 md:my-4 my-4 flex flex-col gap-4">
        <BaseBox className="p-4 md:w-auto w-full">
          <div
            className={`md:overflow-x-visible overflow-x-auto flex items-center md:w-[88vw] w-full py-1 gap-4 px-[0.1rem]`}
          >
            <div className="flex items-center md:pr-4 pr-4 gap-4 border-r-[1.5px] border-slate-300 dark:border-slate-800">
              <AuSoftUI.UI.Button
                onClick={() => {
                  handleButtonSelectedDate("yesterday");
                }}
                variant={selectedDate == "yesterday" ? "primary" : "outline"}
                className="items-center w-fit justify-center"
              >
                <ReactIcons.CgIcon.CgCalendar size={15} />
                <CTranslateTo eng="Yesterday" pt="Ontem" />
              </AuSoftUI.UI.Button>
              <AuSoftUI.UI.Button
                onClick={() => {
                  handleButtonSelectedDate("today");
                }}
                variant={selectedDate == "today" ? "primary" : "outline"}
                className="items-center w-fit justify-center"
              >
                <ReactIcons.CgIcon.CgCalendar size={15} />
                <CTranslateTo eng="Today" pt="Hoje" />
              </AuSoftUI.UI.Button>
              <AuSoftUI.UI.Button
                onClick={() => {
                  handleButtonSelectedDate("tomorrow");
                }}
                variant={selectedDate == "tomorrow" ? "primary" : "outline"}
                className="items-center w-fit justify-center"
              >
                <ReactIcons.CgIcon.CgCalendar size={15} />
                <CTranslateTo eng="Tomorrow" pt="Amanhã" />
              </AuSoftUI.UI.Button>
              <AuSoftUI.UI.TextField.Default
                type="date"
                value={selectedDateInput}
                onChange={(e) => {
                  handleDateTextField(e.target.value);
                }}
                className="md:w-full w-[10rem] text-[0.85rem] cursor-pointer h-[40px] px-[15px] py-[18px]"
              />
            </div>

            <div className="md:flex hidden items-center gap-4 md:pr-4 pr-0 border-r-[1.5px] border-slate-300 dark:border-slate-800">
              <FootballLeagueDropdown />
              <div className="hidden">
                <FootballTeamDropdown />
              </div>
            </div>
            <AuSoftUI.UI.Button
              onClick={handleCleanFilter}
              variant={"primary"}
              className="items-center w-fit justify-center"
            >
              <ReactIcons.CgIcon.CgCalendar size={15} />
              <CTranslateTo eng="Clean filters" pt="Limpar Filtros" />
            </AuSoftUI.UI.Button>
          </div>
        </BaseBox>

        <BaseBox className="p-4 md:hidden flex w-full gap-4">
          <div className="grid grid-cols-1 gap-3 w-full">
            <FootballLeagueDropdown />
            <div className="hidden">
              <FootballTeamDropdown />
            </div>
          </div>
        </BaseBox>

        {isLoadingAllFixtures && (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 7 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl animate-pulse dark:bg-slate-800/30 p-8"
                ></div>
              );
            })}
          </div>
        )}

        {!isLoadingAllFixtures && allFixtures.length > 0 && (
          <TradingLeagues leagues={allFixtures} />
        )}

        {!isLoadingAllFixtures && allFixtures.length <= 0 && (
          <div className="md:mt-24 mt-8 md:mb-8 mb-4">
            <AuSoftUI.Component.ListEmpty
              hasAction={false}
              action_en="Go to PodCasts"
              action_pt="Ver PodCasts"
              action_url="podflex"
              description_en="No games found available date, or with your filters"
              description_pt="Não foram encontrados jogos disponíveis nesta data, ou com os seus filtros"
              title_en="No Available Games"
              title_pt="Sem Jogos Disponíveis"
            />
          </div>
        )}
      </div>
    </div>
  );
}
