import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactIcons } from "@/utils/icons";
import { langByCookies } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";

import React from "react";
import BaseModal from "../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function AllowNotificationModal() {
  //Contexts
  const { userLogged } = useAuth();
  const { handleOpenModal } = useModal();

  async function handleAllow() {
    try {
      const notification = await Notification.requestPermission();

      if (notification == "granted") {
        window.location.href = "/" + langByCookies + "/app";
      }
      if (notification == "denied") {
        alert(
          `${
            langByCookies == "en"
              ? "To allow, open your browser settings, go to notifications, search for the website www.marcaflex.com, and authorize"
              : "Para permitir, abra as definições do seu navegador, entre em notificações, procure pelo site www.marcaflex.com, e autorize"
          }`
        );
      }
    } catch (err) {}
  }

  return (
    <BaseModal callbackClose={() => handleAllow()}>
      <BaseBox className="md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="md:px-8 px-4 py-5 flex flex-col items-center gap-2">
          <div className="p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500">
            <ReactIcons.AiICon.AiFillNotification size={50} className="" />
          </div>
          <h4 className="font-bold text-lg md:w-[20vw] w-[70vw] text-yellow-600 text-center dark:text-yellow-400 mt-4">
            <CTranslateTo
              eng="Missing Notifications"
              pt="Notificações em falta"
            />
          </h4>
          <h4 className="flex md:flex-row flex-col md:w-[30vw] w-[80vw] text-center items-center gap-2 text-sm dark:text-slate-400 text-slate-800">
            <CTranslateTo
              eng={`${userLogged?.first_name}, we need you to enable notifications in your browser settings so that we can always send you messages every time a customer buys your ticket or when you buy one too.`}
              pt={`${userLogged?.first_name}, precisamos que permitas as notificações nas definições do seu navegador, de modos a enviarmos sempre mensagens para você a cada vez que um cliente comprar o seu ingresso ou quando comprares um também.`}
            />
          </h4>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 flex items-center md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            onClick={() => handleOpenModal("")}
            size={"sm"}
            variant={"outline"}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo eng="Cancel" pt="Cancelar" />
          </AuSoftUI.UI.Button>
          <AuSoftUI.UI.Button
            onClick={handleAllow}
            size={"sm"}
            variant={"primary"}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo
              eng="Allow Notifications"
              pt="Permitir Notificações"
            />
          </AuSoftUI.UI.Button>
        </div>
      </BaseBox>
    </BaseModal>
  );
}
