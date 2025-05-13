import { AuSoftUI } from "@/@components/(ausoft)";
import { useTranslate } from "@/providers/app/TranslateProvider";
import { ReactIcons } from "@/utils/icons";
import { useFootballProvider } from "@/providers/features/FootballProvider";

import React from "react";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import useFootballLeagues from "@/hooks/api/football/useFootballLeagues";

export default function ContentCategory({
  callback,
}: {
  callback?: () => void;
}) {
  //Contexts
  const { currentLang } = useTranslate();
  const { allFootballLeagues, isLoadingAllFootballLeagues, handleSeachByName } =
    useFootballLeagues();
  const { handleSelectedFootballAPILeague } = useFootballProvider();

  return (
    <div className="md:w-[20vw] w-[82vw]">
      <div className="flex items-center justify-between pb-2 mb-2 border-b  border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <AuSoftUI.Component.AuSoftLogo size={18} style="mb-1" />
          <h3 className="text-normal font-bold  dark:text-slate-100 ">
            <CTranslateTo pt="Ligas" eng="Leagues" />
          </h3>
        </div>

        {callback && (
          <button
            onClick={callback}
            className="rounded-md pb-3 hover:opacity-80 text-slate-800 dark:text-slate-200"
          >
            <ReactIcons.BiIcon.BiX size={25} />
          </button>
        )}
      </div>
      <div>
        <AuSoftUI.UI.TextField.Default
          onChange={(e) => {
            handleSeachByName({ name: e.target.value });
          }}
          placeholder={currentLang.code == "EN" ? "Search..." : "Pesquisar..."}
          className="w-full"
        />
      </div>
      <div className="flex flex-col mt-2 h-[40vh] overflow-y-auto">
        {isLoadingAllFootballLeagues && (
          <div className="flex justify-center items-center pt-8 dark:text-white">
            <AuSoftUI.Component.isFormSubmitting
              isSubmitting={isLoadingAllFootballLeagues}
            />
          </div>
        )}
        {!isLoadingAllFootballLeagues && allFootballLeagues.length > 0 && (
          <>
            <AuSoftUI.UI.Button
              type="button"
              onClick={() => {
                handleSelectedFootballAPILeague(undefined);
                {
                  callback && callback();
                }
              }}
              className="focus:ring-0 px-1 text-slate-950 justify-start border-none dark:text-slate-300 bg-transparent dark:bg-transparent hover:bg-yellow-200/40 dark:hover:bg-yellow-700"
            >
              <div className="flex items-center gap-4">
                <ReactIcons.Io5Icon.IoFootball size={39} className="mb-1" />
                <div className="flex flex-col gap-0.5 items-start">
                  <h4 className="text-md dark:text-white font-bold">
                    <CTranslateTo
                      eng="View all Leagues"
                      pt="Ver todas as ligas"
                    />
                  </h4>
                  <h4 className="text-md text-slate-600 dark:text-slate-400">
                    <CTranslateTo
                      eng="With all games"
                      pt="Com todos os jogos "
                    />
                  </h4>
                </div>
              </div>
            </AuSoftUI.UI.Button>
            {allFootballLeagues.map((league, i) => {
              return (
                <AuSoftUI.UI.Button
                  type="button"
                  onClick={() => {
                    handleSelectedFootballAPILeague(league);
                    {
                      callback && callback();
                    }
                  }}
                  key={i}
                  className="focus:ring-0 px-1 text-slate-950 justify-start border-none dark:text-slate-300 bg-transparent dark:bg-transparent hover:bg-yellow-200/40 dark:hover:bg-yellow-700"
                >
                  <div className="flex items-center gap-4">
                    <img
                      alt={league.name}
                      src={league.logo}
                      className="w-[40px] h-[40px]"
                    />
                    <div className="flex flex-col gap-0.5 items-start">
                      <h4 className="text-md dark:text-white font-bold">
                        {league.name}
                      </h4>
                      <h4 className="text-md text-slate-600 dark:text-slate-400">
                        <CTranslateTo eng="Country: " pt="País: " />{" "}
                        {` ${league.country}`}
                      </h4>
                    </div>
                  </div>
                </AuSoftUI.UI.Button>
              );
            })}
          </>
        )}

        {!isLoadingAllFootballLeagues && allFootballLeagues.length <= 0 && (
          <div className="flex items-center flex-col gap-2 mt-4">
            <h4 className="text-center text-normal dark:text-white font-bold">
              <CTranslateTo eng="League not found" pt="Liga não encontrada" />
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}
