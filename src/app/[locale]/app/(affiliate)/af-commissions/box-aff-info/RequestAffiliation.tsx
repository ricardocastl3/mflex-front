import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useState } from "react";
import { internalApi } from "@/http/axios/api";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function RequestAffiliation() {
  const { userLogged, fetchUserInformations } = useAuth();
  const { handleAddToastOnArray } = useAppProvider();

  // Controls
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRequest() {
    try {
      setIsSubmitting(true);
      await internalApi.get("/affiliate/reqs");
      await fetchUserInformations();
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <BaseBox className="md:p-4 p-3 w-full h-fit">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row  md:items-center items-start gap-2 md:justify-start justify-between ">
          <h4 className="md:text-base text-[0.9rem] text-slate-600 dark:text-slate-300">
            <CTranslateTo
              eng={"My affiliate code"}
              pt={"Meu código de afiliado"}
            />
          </h4>
          <ReactIcons.MdIcon.MdQrCode
            size={window.innerWidth > 765 ? 17 : 17}
            className="dark:text-violet-500 text-violet-500"
          />
        </div>

        {!userLogged?.profile?.affiliate_request && (
          <AuSoftUI.UI.Button
            onClick={handleRequest}
            variant={"primary"}
            size={"sm"}
            className="items-center"
          >
            {!isSubmitting && (
              <>
                <ReactIcons.PiIcon.PiArrowUpFill size={14} />
                <CTranslateTo
                  eng="Request Affiliation"
                  pt="Solicitar afiliação"
                />
              </>
            )}
            {isSubmitting && (
              <ReactIcons.PiIcon.PiSpinner className="animate-spin" size={18} />
            )}
          </AuSoftUI.UI.Button>
        )}

        {userLogged?.profile?.affiliate_request &&
          !userLogged?.profile?.affiliate_active && (
            <AuSoftUI.UI.Button
              onClick={() =>
                window.open(
                  "https://chat.whatsapp.com/LFuxjzNqpZ07EWa0RGgbr9",
                  "_blank"
                )
              }
              variant={"green"}
              size={"sm"}
              className="items-center"
            >
              <ReactIcons.PiIcon.PiWhatsappLogo size={15} />
              <CTranslateTo
                eng="Click here to request final analysis"
                pt="Clique aqui para pedir análise final"
              />
            </AuSoftUI.UI.Button>
          )}

        {userLogged?.profile?.affiliate_active && (
          <AuSoftUI.Component.Clipboard
            body={
              <div className="w-fit cursor-pointer flex items-center gap-4 hover:text-yellow-700 hover:dark:text-yellow-400 text-yellow-500 dark:text-yellow-300">
                <h4 className="md:text-xl text-[0.9rem]] font-bold ">
                  {userLogged.profile.affiliate_code}
                </h4>
                <ReactIcons.BiIcon.BiCopyAlt size={15} />
              </div>
            }
            text={userLogged.profile.affiliate_code!}
            title_en="Code successfully copied"
            title_pt="Código copiado com sucesso"
          />
        )}
      </div>
    </BaseBox>
  );
}
