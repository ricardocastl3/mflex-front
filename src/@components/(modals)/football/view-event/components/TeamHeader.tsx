import { IFixture } from "@/http/interfaces/models/IFixtures";

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
          width={15}
          height={15}
          alt={side == "home" ? team?.teams.home.name : team?.teams.away.name}
          className="md:hidden flex"
        />
      )}
      <h3 className="text-normal font-bold md:flex hidden">
        {side == "home" ? team?.teams.home.name : team?.teams.away.name}
      </h3>

      {showTitle && (
        <h3 className="text-normal font-bold">
          {side == "home" ? team?.teams.home.name : team?.teams.away.name}
        </h3>
      )}
      {sideFlag == "right" && (
        <img
          src={side == "home" ? team?.teams.home.logo : team?.teams.away.logo}
          width={15}
          height={15}
          alt={side == "home" ? team?.teams.home.name : team?.teams.away.name}
          className="md:hidden flex"
        />
      )}
    </div>
  );
}
