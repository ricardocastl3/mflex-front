import { useModal } from "@/providers/app/ModalProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ReactIcons } from "@/utils/icons";
import { useState } from "react";
import { useFootballProvider } from "@/providers/features/FootballProvider";

import BaseModal from "../../base";
import TeamHeader from "./components/TeamHeader";
import TeamDetails from "@/app/[locale]/(site)/games/components/leagues/TeamDetails";
import EventFootballMiddleResult from "@/app/[locale]/(site)/games/components/leagues/TeamMiddleResult";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TeamPlayer from "./components/TeamPlayer";

export default function ViewFootballEventModal() {
  const { handleOpenModal } = useModal();
  const { selectedFootballTeam } = useFootballProvider();

  const [isLoading, setIsLoading] = useState(true);

  const [tab, setTab] = useState("overview");

  return (
    <BaseModal
      callbackClose={() => handleOpenModal("")}
      customDesktop="pt-2 pb-2"
    >
      <div className="md:w-[95vw] w-[95vw] md:h-[95vh] h-[95vh] flex flex-col">
        <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-end gap-2">
            <AuSoftUI.Component.AuSoftLogo size={36} />
            <div className="flex items-center gap-2 dark:text-white">
              <TeamHeader
                side="home"
                sideFlag="left"
                team={selectedFootballTeam}
              />
              <b className="dark:text-white text-normal font-extrabold">VS</b>
              <TeamHeader
                side="away"
                sideFlag="right"
                team={selectedFootballTeam}
              />
            </div>
          </div>
          <button onClick={() => handleOpenModal("")}>
            <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
          </button>
        </div>
        <div className="h-[80vh] overflow-y-auto bg-slate-100 dark:bg-transparent">
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <div
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/4219812/pexels-photo-4219812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                objectFit: "cover",
                backgroundPosition: "center",
                position: "relative",
                width: "100%",
              }}
              className="flex md:h-[40vh] h-[30vh] items-center justify-center text-white"
            >
              <div className="absolute z-0 bg-black/70 inset-0"></div>
              <div className="z-20 absolute grid grid-cols-3 p-6 md:w-[50vw] w-[90vw] rounded-xl dark:text-white font-bold text-md gap-4">
                <TeamDetails side="home" team={selectedFootballTeam!} />
                <EventFootballMiddleResult
                  eventFootball={selectedFootballTeam!}
                />
                <TeamDetails side="away" team={selectedFootballTeam!} />
              </div>
            </div>
            <div className="md:w-[70vw] w-[90vw]">
              <div className=" flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
                <button className="p-3 font-bold rounded-t-xl bg-white">
                  <CTranslateTo eng="Overview" pt="Visão Geral" />
                </button>
              </div>

              {tab == "overview" && (
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 py-8 dark:bg-slate-800 bg-white md:px-4 px-2 mb-4  rounded-b-xl">
                  <TeamPlayer side="home" team={selectedFootballTeam!} />
                  <div className="md:flex hidden justify-center">
                    <div className="w-[2px] h-full bg-slate-200 dark:bg-slate-800"></div>
                  </div>
                  <TeamPlayer side="away" team={selectedFootballTeam!} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
