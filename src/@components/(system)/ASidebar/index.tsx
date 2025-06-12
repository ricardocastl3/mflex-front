import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useEffect, useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LinkButton from "./components/LinkButton";

export default function ASidebar() {
  //Contexts
  const { currentAppPageUrl, openBanner } = useAppProvider();

  //Controls
  const [showText, setShowText] = useState(false);

  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window != "undefined") {
      const isExpandStorage = localStorage.getItem("sidebar-expanded");
      if (isExpandStorage && isExpandStorage == "true") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", JSON.stringify(isExpanded));
    if (isExpanded) {
      setTimeout(() => {
        setShowText(true);
      }, 200);
    } else {
      setShowText(false);
    }
  }, [isExpanded]);

  return (
    <BaseBox
      shadow={false}
      className={`${
        isExpanded ? "w-[18.6vw] pl-4 pr-2" : "w-[5.76rem] pl-4 pr-1"
      } transition-all duration-500 rounded-none md:flex hidden flex-col inset-y-0 justify-between gap-2 h-screen bg-white dark:bg-ausoft-slate-950 py-4`}
    >
      <div
        className={`${
          openBanner ? "pt-[6rem]" : "pt-[4rem]"
        } flex flex-col gap-4 mx-1.5  relative`}
      >
        <div
          className={`${
            isExpanded ? "-right-6" : "-right-5 "
          } z-20 absolute bottom-0 top-1/2  h-fit`}
        >
          <button
            onClick={() => setIsExpanded((state) => !state)}
            className={`px-1 bg-white dark:bg-ausoft-slate-900 py-2 rounded-xl border w-fit border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-500`}
          >
            <ReactIcons.BiIcon.BiCaretLeft
              size={10}
              className={`${!isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div
          className={`${!isExpanded ? "justify-center" : "pr-4"} ${
            openBanner ? "pb-4 " : "pb-[1.18rem]"
          } dark:text-yellow-500 text-yellow-500 border-b flex border-slate-200 dark:border-slate-800 items-center gap-2`}
        >
          <div
            className={`${
              isExpanded ? "" : "mr-3"
            } flex  pt-0.5 pb-0 rounded-full h-5 px-2 w-fit items-center gap-2`}
          >
            <ReactIcons.VSCIcon.VscSymbolEvent
              size={20}
              className="mb-1 animate-pulse"
            />
          </div>
          {showText && (
            <h4 className="duration-1000 text-sm transition-all  font-bold">
              FlexZone
            </h4>
          )}
        </div>
        <div
          className={`${
            openBanner ? "h-[65vh]" : "h-[70vh]"
          } flex flex-col gap-4 overflow-y-auto pr-2`}
        >
          <h4 className="text-normal text-slate-500 dark:text-slate-300">
            {isExpanded ? (
              <CTranslateTo eng="Navigation" pt="Navegação" />
            ) : (
              <CTranslateTo eng="Naviga." pt="Navega." />
            )}
          </h4>
          <div className="flex flex-col gap-2">
            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.PiIcon.PiHouseFill}
              href=""
              isSelected={currentAppPageUrl == "" || !currentAppPageUrl}
              title_en="Home"
              title_pt="Página Inicial"
            />
            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.HiIcon.HiCreditCard}
              href="subscriptions"
              isSelected={currentAppPageUrl == "subscriptions"}
              title_en="Subscriptions"
              title_pt="Assinaturas"
            />
            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.Hi2Icon.HiTag}
              href="tickets"
              isSelected={currentAppPageUrl == "tickets"}
              title_en="My Tickets"
              title_pt="Meus Ingressos"
            />
            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.FaIcon.FaDonate}
              href="donations"
              isSelected={currentAppPageUrl == "donations"}
              title_en="My Donations"
              title_pt="Minhas Doações"
            />
            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.AiICon.AiFillTool}
              href="settings"
              isSelected={currentAppPageUrl == "settings"}
              title_en="Settings"
              title_pt="Definições"
            />
          </div>
          <h4 className="text-normal text-slate-500 dark:text-slate-300">
            {isExpanded ? (
              <CTranslateTo eng="Events" pt="Eventos" />
            ) : (
              <CTranslateTo eng="Event." pt="Event." />
            )}
          </h4>
          <div className="flex flex-col gap-2">
            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.MdIcon.MdDashboard}
              href="affiliate"
              isSelected={currentAppPageUrl == "affiliate"}
              title_en="Affiliate Dashboard"
              title_pt="Painel do afiliado"
            />

            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.FaIcon.FaCalendarWeek}
              href="organizer"
              isSelected={currentAppPageUrl == "organizer"}
              title_en="Organizer Dashboard"
              title_pt="Painel do organizador"
            />

            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.FaIcon.FaMusic}
              href="artist"
              isSelected={currentAppPageUrl == "artist"}
              title_en="Artist Dashboard"
              title_pt="Painel do artista"
            />
          </div>
        </div>
      </div>
    </BaseBox>
  );
}
