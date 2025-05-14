import useFootballTeamPlayers from "@/hooks/api/football/useFootballTeamPlayers";
import TeamHeader from "../../components/TeamHeader";
import Image from "next/image";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

import { localImages } from "@/utils/images";
import { IFixture } from "@/http/interfaces/models/football/IFixtures";
import { ReactIcons } from "@/utils/icons";

export default function PlayerItem({
  team,
  side,
}: {
  team: IFixture;
  side: "away" | "home";
}) {
  const { isLoadingAllFootballPlayers, allFootballPlayers } =
    useFootballTeamPlayers({ side, team });

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="md:hidden flex border-b border-slate-300 dark:border-slate-800 pb-4">
        <TeamHeader showTitle sideFlag="right" side={side} team={team} />
      </div>

      {isLoadingAllFootballPlayers && (
        <div className="flex items-center justify-center md:p-12 p-8">
          <ReactIcons.CgIcon.CgSpinner
            size={32}
            className="animate-spin dark:text-slate-200 text-slate-700"
          />
        </div>
      )}

      {!isLoadingAllFootballPlayers && !allFootballPlayers && (
        <div className="p-8 flex flex-col items-center gap-2">
          <Image
            width={50}
            height={50}
            src={localImages.vectors.emptyBox}
            alt="Imagem de jogos não encontrados"
          />
          <div className="flex flex-col gap-2">
            <h4 className="text-base text-center font-bold text-yellow-700 dark:text-yellow-400">
              <CTranslateTo
                eng={"Unavailable Information"}
                pt={"Dados Indisponíveis"}
              />
            </h4>
            <h4 className="text-base text-center text-slate-600 dark:text-slate-400">
              <CTranslateTo
                eng={"Data is currently unavailable"}
                pt={"Os dados não estão disponíveis de momento"}
              />
            </h4>
          </div>
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
                        } text-sm dark:text-white uppercase`}
                      >
                        {player.player.name}
                      </h2>
                      {player.statistics[0].goals.conceded != 0 && (
                        <div
                          className={`flex dark:text-yellow-400 text-yellow-500 items-center gap-0.5 ${
                            side == "away" ? "md:justify-end justify-start" : ""
                          }`}
                        >
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
                      alt={player.player.name}
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
