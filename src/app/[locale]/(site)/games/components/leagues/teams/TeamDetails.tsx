import { IFixture } from "@/http/interfaces/models/football/IFixtures";

export default function TeamDetails({
  side,
  team,
}: {
  team: IFixture;
  side: "away" | "home";
}) {
  const score =
    side == "away" ? team.score.fulltime.away : team.score.fulltime.home;

  return (
    <div className="flex flex-col gap-2 items-center justify-between">
      <div className="flex flex-col items-center gap-3.5">
        <img
          src={side == "away" ? team.teams.away.logo : team.teams.home.logo}
          alt={side == "away" ? team.teams.away.name : team.teams.home.name}
          className="h-[27px] w-[27px] object-contain"
        />
        <h1 className="md:text-sm text-[0.85rem] dark:text-white text-center">
          {side == "away" ? team.teams.away.name : team.teams.home.name}
        </h1>
      </div>
      <b className="text-lg dark:text-white">
        {score
          ? score
          : `${
              team.fixture.status.short == "FT" ||
              team.fixture.status.short == "1H" ||
              team.fixture.status.short == "2H" ||
              team.fixture.status.short == "AET" ||
              team.fixture.status.short == "PEN"
                ? 0
                : "-------"
            }`}
      </b>
    </div>
  );
}
