import { useFootballProvider } from "@/providers/features/FootballProvider";
import PlayerItem from "./PlayerItem";

export default function TabPlayers() {
  const { selectedFootballTeam } = useFootballProvider();
  return (
    <div className="flex md:flex-row flex-col gap-4 w-full animate-fade">
      <PlayerItem side="home" team={selectedFootballTeam!} />
      <div className="md:flex hidden justify-center w-[8px]">
        <div className="w-[2px] h-full bg-slate-200 dark:bg-slate-800"></div>
      </div>
      <PlayerItem side="away" team={selectedFootballTeam!} />
    </div>
  );
}
