import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useResourceProvider } from "@/providers/features/ResourceProvider";
import { useState, useRef, useEffect } from "react";
import { ReactIcons } from "@/utils/icons";
import { createPortal } from "react-dom";

import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CRTCommentInputPost() {
  const { selectedResource, handleFetchResource } = useResourceProvider();
  const { handleAddToastOnArray } = useAppProvider();

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function handleResize() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

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

  if (!mounted) return null;

  if (isMobile) {
    // Renderiza via Portal no body (fixo na tela)
    return createPortal(
      <div className="md:relative fixed md:border-t-0 border-t border-slate-300 dark:border-slate-800 md:inset-x-auto inset-x-0 z-50 md:bottom-auto bottom-0 border-b md:p-0 p-2 flex md:flex-col flex-row md:bg-transparent bg-white md:dark:bg-transparent dark:bg-ausoft-slate-900 md:items-start items-center gap-4 md:pt-0 pt-4 pb-4">
        <AuSoftUI.UI.TextField.TextArea
          ref={textareaRef}
          onChange={(e) => {
            setContent(e.target.value);
            handleResize();
          }}
          value={content}
          onInput={handleResize}
          placeholder={`${
            langByCookies == "pt"
              ? "Escreva um comentário..."
              : "Write a comment..."
          }`}
          className="flex-1 py-3 min-h-[20px] w-full max-h-[100px] md:max-h-[100px] border-none bg-slate-200 text-slate-800 dark:bg-slate-800/20 dark:text-white"
        />
        <AuSoftUI.UI.Button
          disabled={isSubmitting}
          onClick={handleComment}
          className="rounded-full h-fit md:w-full w-fit font-bold items-center"
          variant={"primary"}
        >
          <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />

          {!isSubmitting && (
            <>
              <ReactIcons.AiICon.AiOutlineSend size={15} />
              <p className="md:flex hidden">
                <CTranslateTo eng="Comment" pt="Comentar" />
              </p>
            </>
          )}
        </AuSoftUI.UI.Button>
      </div>,
      document.body
    );
  }

  // Desktop: renderiza normalmente (no fluxo do pai)
  return (
    <div className="md:relative fixed md:border-t-0 border-t border-slate-300 dark:border-slate-800 md:inset-x-auto inset-x-0 z-50 md:bottom-auto bottom-0 border-b flex md:flex-col flex-row md:bg-transparent bg-white md:dark:bg-transparent dark:bg-ausoft-slate-900 md:items-start items-center gap-4 md:pt-0 pt-4 pb-4">
      <AuSoftUI.UI.TextField.TextArea
        ref={textareaRef}
        onChange={(e) => {
          setContent(e.target.value);
          handleResize();
        }}
        value={content}
        onInput={handleResize}
        placeholder={`${
          langByCookies == "pt"
            ? "Escreva um comentário..."
            : "Write a comment..."
        }`}
        className="flex-1 py-3 min-h-[20px] w-full max-h-[100px] md:max-h-[100px] border-none bg-slate-200 text-slate-800 dark:bg-slate-800/20 dark:text-white"
      />
      <AuSoftUI.UI.Button
        disabled={isSubmitting}
        onClick={handleComment}
        className="rounded-full h-fit md:w-full w-fit font-bold items-center"
        variant={"primary"}
      >
        <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />

        {!isSubmitting && (
          <>
            <ReactIcons.AiICon.AiOutlineSend size={15} />
            <p className="md:flex hidden">
              <CTranslateTo eng="Comment" pt="Comentar" />
            </p>
          </>
        )}
      </AuSoftUI.UI.Button>
    </div>
  );
}
