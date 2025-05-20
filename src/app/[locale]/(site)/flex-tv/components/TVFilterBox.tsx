import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { Dispatch, SetStateAction } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function TVFilterBox({
  setValue,
  value,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <BaseBox className="p-4 md:w-auto w-full">
      <div
        className={`overflow-x-auto flex items-center md:w-[88vw] w-full py-1 gap-4 px-[0.1rem]`}
      >
        <div className="flex items-center md:pr-4 pr-4 gap-4">
          <AuSoftUI.UI.Button
            onClick={() => {
              setValue("all");
            }}
            variant={value == "all" ? "primary" : "outline"}
            className="items-center w-fit justify-center"
          >
            <ReactIcons.CgIcon.CgTv size={15} />
            <CTranslateTo eng="All Channels" pt="Todos os canais" />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button
            onClick={() => {
              setValue("active");
            }}
            variant={value == "active" ? "primary" : "outline"}
            className="items-center w-fit justify-center"
          >
            <ReactIcons.CgIcon.CgTv size={15} />
            <CTranslateTo eng="My Channels" pt="Meus Canais" />
          </AuSoftUI.UI.Button>
        </div>
      </div>
    </BaseBox>
  );
}
