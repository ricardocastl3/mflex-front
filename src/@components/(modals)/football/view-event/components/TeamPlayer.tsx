import useFootballTeamPlayers from "@/hooks/api/football/useFootballTeamPlayers";
import TeamHeader from "./TeamHeader";

import { IFixture } from "@/http/interfaces/models/IFixtures";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";

export default function TeamPlayer({
  team,
  side,
}: {
  team: IFixture;
  side: "away" | "home";
}) {
  const { isLoadingAllFootballPlayers, allFootballPlayers } =
    useFootballTeamPlayers({ side, team });

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="md:hidden flex border-b border-slate-300 dark:border-slate-800 pb-4">
        <TeamHeader showTitle sideFlag="right" side={side} team={team} />
      </div>

      {isLoadingAllFootballPlayers && (
        <div className="flex items-center justify-center p-4">
          <ReactIcons.CgIcon.CgSpinner
            size={20}
            className="animate-spin dark:text-slate-200 text-slate-700"
          />
        </div>
      )}

      {!isLoadingAllFootballPlayers && !allFootballPlayers && (
        <div className="p-8">
          <AuSoftUI.Component.ListEmpty
            action_en=""
            action_pt=""
            title_en="Unavailable Information"
            title_pt="Dados Indisponíveis"
            description_en="Data is currently unavailable"
            description_pt="Os dados não estão disponíveis de momento"
            hasAction={false}
            action_url=""
          />
        </div>
      )}

      {!isLoadingAllFootballPlayers &&
        allFootballPlayers &&
        allFootballPlayers.players.length > 0 && (
          <>
            {allFootballPlayers.players.map((player, i) => {
              return (
                <div key={i} className="flex items-center gap-3 w-full">
                  <div
                    className={`${
                      side == "home"
                        ? "flex-row-reverse"
                        : "md:flex-row flex-row-reverse "
                    } flex items-center md:justify-end justify-start gap-2 md:w-full w-fit`}
                  >
                    <div className="flex flex-col">
                      <h2
                        className={`${
                          side == "home" ? "text-start" : "text-end"
                        } text-sm dark:text-white`}
                      >
                        {player.player.name}
                      </h2>
                      {player.statistics[0].goals.conceded != 0 && (
                        <div className="flex items-center gap-0.5">
                          <ReactIcons.Io5Icon.IoFootball size={12} />
                          <h1 className="text-[0.7rem] font-bold">
                            {player.statistics[0].goals.conceded}
                          </h1>
                        </div>
                      )}
                    </div>

                    <div className="w-[1.2rem] text-center">
                      <h2 className="text-sm font-bold dark:text-white">
                        {player.statistics[0].games.position}
                      </h2>
                    </div>

                    <div className="text-center w-[1.4rem]">
                      <h2 className="text-sm dark:text-white">
                        {player.statistics[0].games.number}
                      </h2>
                    </div>

                    <img
                      src={player.player.photo}
                      width={30}
                      height={30}
                      alt={player.player.photo}
                      className="rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}
    </div>
  );
}
