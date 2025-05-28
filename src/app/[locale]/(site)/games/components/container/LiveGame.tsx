import { ReactIcons } from "@/utils/icons";
import { ILeagues } from "@/http/interfaces/models/football/IFixturesAPI";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LeagueItem from "../leagues/LeagueItem";

export default function LiveGame({ leagues }: { leagues: ILeagues[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <ReactIcons.MdIcon.MdCircle
          size={20}
          className="text-green-500 animate-pulse"
        />
        <h1 className="text-xl font-bold">
          <CTranslateTo eng="Live Game" pt="Jogos Ao Vivo" />
        </h1>
      </div>
      <div className="">
        <div className="flex flex-col gap-4">
          {leagues.map((league, i) => {
            return <LeagueItem key={i} league={league} />;
          })}
        </div>
      </div>
    </div>
  );
}
