import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { useEffect, useState } from "react";
import { useEventProvider } from "@/providers/features/EventProvider";
import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useMusicProvider } from "@/providers/features/MusicProvider";
import { complaintMusicTitles } from "./utils";

import AAuSoftLogo from "@/@components/(ausoft)/AAuSoftLogo";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import ARegisterProgress from "@/@components/(ausoft)/ARegisterProgress";

export default function ArtistComplaintMusicModal() {
  // Contexts
  const { handleFetchEvent, handleSelectEvent, selectedEvent } =
    useEventProvider();
  const { selectedMusic } = useMusicProvider();
  const { handleOpenModal, handleAddTextOnBoxSuccess } = useModal();
  const { handleAddToastOnArray } = useAppProvider();

  // Controls
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister() {
    try {
      if (title == "") {
        return AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please, select a category",
          description_pt: "Por favor, selecione uma categoria",
          title_en: "No Category",
          title_pt: "Sem Categoria",
          toast: handleAddToastOnArray,
          type: "error",
        });
      }

      setIsSubmitting(true);

      await internalApi.post("/artists/musics/cmp", {
        music_id: selectedMusic?.id,
        title,
        reason,
      });

      handleAddTextOnBoxSuccess({
        text_en:
          "We have received your feedback and will be happy to review it carefully.",
        text_pt:
          "Recebemos o seu feedback e teremos muito gosto em analisar com muita atenção",
        title_en: "Very good! Thanks for your feedback 👏",
        title_pt: "Muito bem! Agradecemos pelo seu feedback 👏",
      });

      handleOpenModal("box-success");
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  function handleClose() {
    handleOpenModal("");
    handleFetchEvent(false);
    handleSelectEvent(undefined);
  }

  return (
    <BaseModal callbackClose={handleClose} customDesktop="p-2">
      <div className="flex flex-col md:w-[50vw] w-[90vw] relative pb-2 justify-between">
        <div className="flex items-center justify-between p-4 border-b border-slate-300 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <AAuSoftLogo size={40} />
            <h3 className="text-base font-bold dark:text-white">
              <CTranslateTo eng="Report Music: " pt="Denúnciar música: " />{" "}
              {selectedMusic?.title}
            </h3>
          </div>
          <button
            onClick={() => handleOpenModal("")}
            className="dark:text-white"
          >
            <ReactIcons.BiIcon.BiX size={20} />
          </button>
        </div>
        <div className="p-5 flex flex-col gap-4 h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h1 className="text-base dark:text-white">
              <CTranslateTo eng="Category" pt="Categoria" />
            </h1>
            <AuSoftUI.UI.Select
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-full"
              weight={"md"}
            >
              <option
                value={""}
                className="dark:bg-ausoft-slate-950 dark:text-white"
              >
                <CTranslateTo
                  eng="--------- Select an category -------"
                  pt="-------- Selecione uma categoria ------"
                />
              </option>

              {complaintMusicTitles.map((til, i) => {
                return (
                  <option
                    key={i}
                    value={til.value}
                    className="dark:bg-ausoft-slate-950 dark:text-white"
                  >
                    <CTranslateTo eng={til.t_en} pt={til.t_pt} />
                  </option>
                );
              })}
            </AuSoftUI.UI.Select>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="dark:text-white">
              <CTranslateTo
                eng="Reason for the complaint"
                pt="Motivo da denúncia"
              />
            </h3>
            <AuSoftUI.UI.TextField.TextArea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              weight={"md"}
              className="w-full h-[40vh]"
              placeholder={
                langByCookies == "en"
                  ? "Write in detail the reason for the complaint..."
                  : "Escreva de forma detalhada o motivo da denúncia..."
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:px-5 px-5 py-4 border-t border-slate-300 dark:border-slate-800 ">
          <AuSoftUI.UI.Button
            onClick={handleRegister}
            size={"md"}
            variant={"primary"}
          >
            {!isSubmitting && (
              <CTranslateTo eng="Send report" pt="Enviar denúncia" />
            )}

            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button
            onClick={handleClose}
            type="button"
            size={"md"}
            variant={"outline"}
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
        </div>

        <ARegisterProgress isOpened={isSubmitting} rounded="all" />
      </div>
    </BaseModal>
  );
}
