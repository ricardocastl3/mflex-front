import { IFixture } from "@/http/interfaces/models/football/IFixtures";

export default function TeamHeader({
  side,
  team,
  sideFlag,
  showTitle = false,
}: {
  team: IFixture | undefined;
  side: "away" | "home";
  sideFlag: "right" | "left";
  showTitle?: boolean;
}) {
  return (
    <div className="flex items-center flex-row-reverse gap-2">
      {sideFlag == "left" && (
        <img
          src={side == "home" ? team?.teams.home.logo : team?.teams.away.logo}
          alt={side == "home" ? team?.teams.home.name : team?.teams.away.name}
          className="md:hidden flex w-[20px] h-[20px]"
        />
      )}
      <h3 className="text-normal dark:text-white font-bold md:flex hidden">
        {side == "home" ? team?.teams.home.name : team?.teams.away.name}
      </h3>

      {showTitle && (
        <h3 className="text-normal dark:text-white font-bold">
          {side == "home" ? team?.teams.home.name : team?.teams.away.name}
        </h3>
      )}
      
      {sideFlag == "right" && (
        <img
          src={side == "home" ? team?.teams.home.logo : team?.teams.away.logo}
          alt={side == "home" ? team?.teams.home.name : team?.teams.away.name}
          className="md:hidden flex w-[20px] h-[20px]"
        />
      )}
    </div>
  );
}
