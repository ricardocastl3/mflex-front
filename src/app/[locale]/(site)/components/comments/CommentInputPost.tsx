import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useResourceProvider } from "@/providers/features/ResourceProvider";
import { useState } from "react";
import { ReactIcons } from "@/utils/icons";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CommentInputPost() {
  const { selectedResource, handleFetchResource } = useResourceProvider();
  const { handleAddToastOnArray, currentLastPageUrl } = useAppProvider();

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleComment() {
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
      await internalApi.post("/users/comments", {
        content,
        id: selectedResource?.id,
      });
      setContent("");
      setIsSubmitting(false);
      handleFetchResource(true);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({
        err,
        openToast: handleAddToastOnArray,
      });
    }
  }

  return (
    <div className="border-b flex md:flex-row flex-col md:items-center items-start gap-4 border-slate-300 dark:border-slate-800 pb-4">
      <AuSoftUI.UI.TextField.TextArea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        placeholder={`${
          langByCookies == "pt"
            ? "Escreva um comentário..."
            : "Write a comment..."
        }`}
        className="flex-1 h-[200px] w-full  border-none bg-slate-200 text-slate-800 dark:bg-slate-800/20 dark:text-white"
      />
      <AuSoftUI.UI.Button
        disabled={isSubmitting}
        onClick={handleComment}
        className="rounded-full h-fit font-bold items-center"
        variant={"primary"}
      >
        <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />

        {!isSubmitting && <ReactIcons.AiICon.AiOutlineSend size={15} />}

        {window.innerWidth <= 765 && !isSubmitting && (
          <CTranslateTo eng="Comment" pt="Comentar" />
        )}
      </AuSoftUI.UI.Button>
    </div>
  );
}
