import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi, langByCookies } from "@/http/axios/api";
import { IResourceComment } from "@/http/interfaces/models/resources/IResourceComment";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useResourceProvider } from "@/providers/features/ResourceProvider";
import { ReactIcons } from "@/utils/icons";
import { useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function ResInputAnswer({
  callbackClose,
  comment,
}: {
  comment: IResourceComment;
  callbackClose: () => void;
}) {
  const { handleAddToastOnArray } = useAppProvider();
  const { handleFetchResource } = useResourceProvider();

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleEditComment() {
    try {
      if (content.length <= 0) {
        AuSoftUI.Component.ToastifyWithTranslation({
          description_en: "Please write a comment before submitting.",
          description_pt: "Por favor, escreva um comentário antes de enviar.",
          title_en: "Empty Comment",
          title_pt: "Comentário Vazio",
          toast: handleAddToastOnArray,
          type: "error",
        });
        return;
      }

      setIsSubmitting(true);
      handleFetchResource(false);
      await internalApi.post("/users/comments/res", {
        id: comment.id,
        content,
      });
      handleFetchResource(true);
      setIsSubmitting(false);
      setContent("");
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <div className="border-t border-r-slate-300  animate-fade border-b flex flex-col items-start gap-4 border-slate-300 dark:border-slate-800 py-4">
      <AuSoftUI.UI.TextField.TextArea
        placeholder={`${
          langByCookies == "pt"
            ? "Escreva a sua resposta..."
            : "Write your answer..."
        }`}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        className="flex-1 h-[150px] w-full  border-none bg-slate-200 text-slate-800 dark:bg-slate-800/20 dark:text-white"
      />
      <div className="flex items-center gap-2">
        <AuSoftUI.UI.Button
          disabled={isSubmitting}
          onClick={handleEditComment}
          className="rounded-full h-fit font-bold items-center"
          variant={"primary"}
        >
          <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />

          {!isSubmitting && (
            <>
              <ReactIcons.AiICon.AiOutlineSend
                className="-rotate-90"
                size={15}
              />
              <CTranslateTo eng="Answer" pt="Responder" />
            </>
          )}
        </AuSoftUI.UI.Button>
        <AuSoftUI.UI.Button
          disabled={isSubmitting}
          onClick={callbackClose}
          className="rounded-full h-fit font-bold items-center"
          variant={"outline"}
        >
          <CTranslateTo eng="Cancel" pt="Cancelar" />
        </AuSoftUI.UI.Button>
      </div>
    </div>
  );
}
