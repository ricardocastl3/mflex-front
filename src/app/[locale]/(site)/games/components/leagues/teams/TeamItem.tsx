import { IFixtureAPI } from "@/http/interfaces/models/football/IFixturesAPI";
import { useModal } from "@/providers/app/ModalProvider";
import { useFootballProvider } from "@/providers/features/FootballProvider";

import TeamDetails from "./TeamDetails";
import EventFootballMiddleResult from "./TeamMiddleResult";

export default function TeamItem({ team }: { team: IFixtureAPI }) {
  const { handleOpenModal } = useModal();
  const { handleSelectFootballTeam } = useFootballProvider();

  return (
    <div
      onClick={() => {
        handleSelectFootballTeam(team);
        handleOpenModal("view-football-event");
      }}
      className="flex cursor-pointer transition-all items-center w-full gap-4 border-b justify-center  rounded-xl border-slate-400/50 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800/50"
    >
      <div className="grid grid-cols-3 p-6 md:w-[50vw] w-[90vw] rounded-xl dark:text-white font-bold text-md gap-4">
        <TeamDetails side="home" team={team} />
        <EventFootballMiddleResult eventFootball={team} />
        <TeamDetails side="away" team={team} />
      </div>
    </div>
  );
}
