import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useAppProvider } from "@/providers/app/AppProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useModal } from "@/providers/app/ModalProvider";

import LinkMButton from "./components/LinkMButton";

export default function AMobileFooter() {
  //Contexts
  const { handleOpenModal } = useModal();
  const { currentAppPageUrl } = useAppProvider();

  return (
    <div>
      <div className="md:hidden flex fixed bottom-[4.9rem] right-3 z-20">
        <AuSoftUI.UI.Button
          onClick={() => handleOpenModal("mobile-more-options")}
          className="rounded-full p-3"
          variant={"primary"}
        >
          <ReactIcons.BiIcon.BiDotsHorizontal size={18} />
        </AuSoftUI.UI.Button>
      </div>
      <BaseBox className="dark:bg-ausoft-slate-900 z-20 md:hidden border-t rounded-t-xl border-slate-200 dark:border-slate-800 fixed bottom-0 rounded-none grid grid-cols-4 inset-x-0">
        <LinkMButton
          Icon={ReactIcons.CgIcon.CgHome}
          action="/"
          isSelected={currentAppPageUrl == "" || !currentAppPageUrl}
          title_en="Home"
          title_pt="Página Inicial"
        />

        <LinkMButton
          Icon={ReactIcons.PiIcon.PiShoppingBagFill}
          action="products"
          isSelected={currentAppPageUrl == "products"}
          title_en="My Products"
          title_pt="Meus Produtos"
        />

        <LinkMButton
          Icon={ReactIcons.AiICon.AiOutlineTransaction}
          action="transactions"
          isSelected={currentAppPageUrl == "transactions"}
          title_en="Transactions"
          title_pt="Transações"
        />

        <LinkMButton
          Icon={ReactIcons.AiICon.AiFillBuild}
          action="webhooks"
          isSelected={currentAppPageUrl == "webhooks"}
          title_en="Webhooks"
          title_pt="Webhooks"
        />
      </BaseBox>
    </div>
  );
}
