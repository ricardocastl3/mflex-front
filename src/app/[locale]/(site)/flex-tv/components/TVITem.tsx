import { BaseBox } from "@/@components/(box)/BaseBox";
import { AuSoftUI } from "@/@components/(ausoft)";
import { IWatchTV } from "@/http/interfaces/models/IWatchTV";
import { useFlexTVProvider } from "@/providers/features/FlexTVProvider";
import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function TVItem({ item }: { item: IWatchTV }) {
  const { handleSelectFlexTV } = useFlexTVProvider();
  const { handleOpenModal } = useModal();

  return (
    <BaseBox className="p-3 flex w-full md:flex-row flex-col md:justify-between justify-start gap-4">
      <div className="flex items-center gap-2">
        <img src={item.image} alt="" width={50} height={50} />
        <div className="flex flex-col gap-0.5">
          <h1 className="font-bold dark:text-white">{item.channel}</h1>
          <h1 className="text-sm dark:text-slate-300 text-slate-600">
            <CTranslateTo
              eng={"Follow the broadcast"}
              pt={"Acompanhe a transmissão de "}
            />
          </h1>
        </div>
      </div>
      <AuSoftUI.UI.Button
        onClick={() => {
          handleSelectFlexTV(item);
          handleOpenModal("watch-tv");
        }}
        variant={"primary"}
        className="items-center justify-center"
      >
        <ReactIcons.MdIcon.MdTv size={14} />
        <CTranslateTo eng="Watch TV" pt="Assistir" />
      </AuSoftUI.UI.Button>
    </BaseBox>
  );
}
