"use client";

import { useAppProvider } from "@/providers/app/AppProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AuSoftUI } from "..";

interface IAClipboard {
  title_pt: string;
  title_en: string;
  text: string;
  body: React.ReactNode;
}

export default function AClipboard({
  body,
  title_en,
  title_pt,
  text,
}: IAClipboard) {
  const { handleAddToastOnArray } = useAppProvider();

  function handleCopy(e: string) {
    return AuSoftUI.Component.ToastifyWithTranslation({
      description_en: "The content was copied successfully",
      description_pt: "O conteúdo foi copiado com sucesso",
      title_en,
      title_pt,
      toast: handleAddToastOnArray,
      type: "success",
    });
  }

  return (
    <CopyToClipboard text={text} onCopy={(e, r) => handleCopy(e)}>
      {body}
    </CopyToClipboard>
  );
}
