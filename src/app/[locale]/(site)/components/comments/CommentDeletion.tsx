import { useAppProvider } from "@/providers/app/AppProvider";
import { internalApi } from "@/http/axios/api";
import { useResourceProvider } from "@/providers/features/ResourceProvider";
import { useState } from "react";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";

import BaseModal from "@/@components/(modals)/base";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function CommentDeletion({
  callbackClose,
  id,
  type,
}: {
  callbackClose: () => void;
  id: string;
  type: "response" | "comment";
}) {
  const { handleFetchResource } = useResourceProvider();
  const { handleAddToastOnArray } = useAppProvider();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleDelete() {
    try {
      setIsSubmitting(true);
      handleFetchResource(false);
      const route = type == "comment" ? "" : "/res";
      await internalApi.delete("/users/comments" + route, {
        data: {
          id,
        },
      });
      setIsSubmitting(false);
      handleFetchResource(true);
      callbackClose();
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <BaseModal callbackClose={callbackClose}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2">
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-500">
            <ReactIcons.FaIcon.FaTrash size={40} className="" />
          </div>
          <h4 className="font-bold text-lg md:w-[20vw] w-[70vw] text-red-600 text-center dark:text-red-400 mt-4">
            <CTranslateTo eng="Delete Comment" pt="Eliminar Comentário" />
          </h4>
          <h4 className="flex md:flex-row flex-col md:w-[30vw] w-[80vw] text-center items-center gap-2 text-base dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={`Are you sure you want to delete this comment? This action cannot be undone.`}
              pt={`Tem certeza que deseja eliminar este comentário? Esta ação não pode ser desfeita.`}
            />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 grid grid-cols-2 md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            disabled={isSubmitting}
            onClick={handleDelete}
            size={"sm"}
            variant={"destructive"}
            className="w-full justify-center rounded-full"
          >
            {!isSubmitting && (
              <CTranslateTo eng="Delete Comment" pt="Eliminar comentário" />
            )}

            <AuSoftUI.Component.isFormSubmitting isSubmitting={isSubmitting} />
          </AuSoftUI.UI.Button>

          <AuSoftUI.UI.Button
            disabled={isSubmitting}
            size={"sm"}
            variant={"outline"}
            onClick={callbackClose}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
