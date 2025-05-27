import { langByCookies } from "@/http/axios/api";
import { IFixtureAPI } from "@/http/interfaces/models/football/IFixturesAPI";

import { ReactIcons } from "@/utils/icons";
import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import { statusColors, statusMap } from "./team";

import DateServices from "@/services/DateServices";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function EventFootballMiddleResult({
  eventFootball,
}: {
  eventFootball: IFixtureAPI;
}) {
  const status = eventFootball.fixture.status.short;
  const translation = statusMap[status];
  const color = statusColors[status];

  return (
    <div className="flex items-center md:text-sm text-[0.85rem]  text-center gap-3.5 flex-col ">
      <b>
        <ReactIcons.BiIcon.BiMinus size={20} />
      </b>
      <h2 className="dark:text-white">
        {DateServices.dateWithBars(eventFootball.fixture.date)}{" "}
        {` ${langByCookies == "pt" ? "às" : "at"} ${format(
          eventFootball.fixture.date,
          "HH:mm",
          {
            locale: langByCookies == "pt" ? ptBR : enUS,
          }
        )}`}
      </h2>
      <h4 className={`${color} text-center`}>
        <CTranslateTo eng={translation.en} pt={translation.pt} />
      </h4>
    </div>
  );
}
