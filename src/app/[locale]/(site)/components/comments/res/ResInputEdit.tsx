import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi } from "@/http/axios/api";
import { IResourceComment } from "@/http/interfaces/models/resources/IResourceComment";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useResourceProvider } from "@/providers/features/ResourceProvider";
import { ReactIcons } from "@/utils/icons";
import { useState } from "react";
import { IRCommentResponse } from "@/http/interfaces/models/resources/IRCommentResponse";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function ResInputEdit({
  callbackClose,
  response,
}: {
  response: IRCommentResponse;
  callbackClose: () => void;
}) {
  const { handleAddToastOnArray } = useAppProvider();
  const { handleFetchResource } = useResourceProvider();

  const [content, setContent] = useState(response.content);
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
      await internalApi.put("/users/comments/res", {
        id: response.id,
        content,
      });
      handleFetchResource(true);
      setIsSubmitting(false);
      callbackClose();
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <div className="animate-fade border-b flex flex-col items-start gap-4 border-slate-300 dark:border-slate-800 pb-4">
      <AuSoftUI.UI.TextField.TextArea
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
              <ReactIcons.AiICon.AiOutlineSend size={15} />
              <CTranslateTo eng="Update" pt="Atualizar" />
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
