import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LeagueItem from "../leagues/LeagueItem";

import { ReactIcons } from "@/utils/icons";
import { ILeagues } from "@/http/interfaces/models/IFixtures";

export default function TradingLeagues({ leagues }: { leagues: ILeagues[] }) {
  return (
    <section  className="flex flex-col gap-4">
      <div className="flex items-center gap-2 dark:text-yellow-500 text-yellow-600">
        <ReactIcons.MdIcon.MdCircle size={20} className="animate-pulse" />
        <h1 className="text-xl font-bold">
          <CTranslateTo eng="Trading Games" pt="Jogos Em Destaques" />
        </h1>
      </div>
      <div className="">
        <div className="flex flex-col gap-4">
          {leagues.map((league, i) => {
            return <LeagueItem key={i} league={league} />;
          })}
        </div>
      </div>
    </section>
  );
}
