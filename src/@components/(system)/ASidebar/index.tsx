import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import LinkButton from "./components/LinkButton";

export default function ASidebar() {
  //Contexts
  const { currentAppPageUrl, openBanner } = useAppProvider();
  const { userLogged } = useAuth();

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
      } transition-all duration-500 rounded-none md:flex hidden flex-col inset-y-0 justify-between gap-2 h-screen bg-white dark:bg-ausoft-slate-900 py-4`}
    >
      <div
        className={`${
          openBanner ? "pt-[6rem]" : "pt-[4rem]"
        } flex flex-col gap-4 mx-1.5  relative`}
      >
        <button
          onClick={() => setIsExpanded((state) => !state)}
          className={`${
            isExpanded ? "-right-7" : "-right-5"
          } absolute z-20  px-2 bg-white dark:bg-ausoft-slate-900 py-2 rounded-full border-2 w-fit border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-500`}
        >
          <ReactIcons.BiIcon.BiCaretLeft
            size={10}
            className={`${!isExpanded ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className={`${!isExpanded ? "justify-center" : "pr-4"} ${
            openBanner ? "pb-4 " : "pb-[1.18rem]"
          } border-b flex  border-slate-200 dark:border-slate-800`}
        >
          <div
            className={`${
              isExpanded ? "" : "mr-3"
            } flex  pt-0.5 pb-0 rounded-full h-5 px-2 w-fit items-center dark:bg-blue-900/50 dark:text-blue-200 bg-blue-100 text-blue-700 gap-2`}
          >
            <ReactIcons.FaIcon.FaCircle
              size={10}
              className="mb-1 animate-pulse"
            />
          </div>
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
              Icon={ReactIcons.PiIcon.PiHouse}
              href=""
              isSelected={currentAppPageUrl == "" || !currentAppPageUrl}
              title_en="Home"
              title_pt="Página Inicial"
            />

            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.PiIcon.PiShoppingBagFill}
              href="products"
              isSelected={currentAppPageUrl == "products"}
              title_en="My Products"
              title_pt="Meus Produtos"
            />

            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.AiICon.AiOutlineTransaction}
              href="transactions"
              isSelected={currentAppPageUrl == "transactions"}
              title_en="Transactions"
              title_pt="Transações"
            />

            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.AiICon.AiFillMoneyCollect}
              href="transfer"
              isSelected={currentAppPageUrl == "transfer"}
              title_en="Transferences"
              title_pt="Transferências"
            />

            <LinkButton
              isExpanded={showText}
              Icon={ReactIcons.AiICon.AiFillBuild}
              href="webhooks"
              isSelected={currentAppPageUrl == "webhooks"}
              title_en="Webhooks"
              title_pt="Webhooks"
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
              <CTranslateTo eng="Community" pt="Comunidade" />
            ) : (
              <CTranslateTo eng="Commu." pt="Commu." />
            )}
          </h4>
          <div className="flex flex-col gap-2">
            <LinkButton
              onClick={() => {
                window.open("https://chat.whatsapp.com/JokBihhucQF9xtNfyYeuhK");
              }}
              isExpanded={showText}
              Icon={ReactIcons.PiIcon.PiWhatsappLogo}
              href="#"
              isSelected={false}
              title_en="WhatsApp"
              title_pt="WhatsApp"
            />
          </div>

        </div>
      </div>
    </BaseBox>
  );
}
