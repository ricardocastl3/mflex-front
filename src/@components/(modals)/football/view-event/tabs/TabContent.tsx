import TabFootballAI from "./football-ai/TabFootballAI";
import TabOverview from "./overview/TabOverview";
import TabPlayers from "./players/TabPlayer";
import TabStats from "./stats/TabStats";

export default function TabContent({ tab }: { tab: string }) {
  switch (tab) {
    case "overview":
      return <TabOverview />;
    case "football-ai":
      return <TabFootballAI />;

    case "stats":
      return <TabStats />;

    case "players":
      return <TabPlayers />;
    default:
      return null;
  }
}
