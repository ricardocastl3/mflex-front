"use client";

import { BaseBox } from "@/@components/(box)/BaseBox";
import { ReactIcons } from "@/utils/icons";
import { useModal } from "@/providers/app/ModalProvider";
import { langByCookies } from "@/http/axios/api";
import { AuSoftUI } from "@/@components/(ausoft)";
import { ITutorial } from "@/http/interfaces/models/ITutorials";

import React, { useEffect, useState } from "react";
import LogoSpinner from "@/app/onload-pages/spinner/LogoSpinner";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import TutorialItem from "./TutorialItem";
import useTutorials from "@/hooks/api/useTutorials";

export default function TutorialModal({
  type,
}: {
  type: "affiliate" | "artist" | "organizer";
}) {
  //Contexts
  const { handleOpenModal } = useModal();
  const { isLoadingTutorial, allTutorial } = useTutorials({
    view: type,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [allTutorialFiltered, setTutorialFiltered] = useState<ITutorial[]>([]);
  const [device, setDevice] = useState("mobile");

  function handleCloseBox() {
    handleOpenModal("");
  }

  const title =
    type == "affiliate"
      ? langByCookies == "pt"
        ? "Vídeo aulas - Afiliados"
        : "Tutorials - Affiliates"
      : type == "artist"
      ? langByCookies == "pt"
        ? "Vídeo aulas - Artista"
        : "Tutorials - Artist"
      : type == "organizer"
      ? langByCookies == "pt"
        ? "Vídeo aulas - Organizador de eventos"
        : "Tutorials - Event Organizer"
      : "";

  useEffect(() => {
    if (isLoadingTutorial) return;

    const all =
      device == "all"
        ? allTutorial.filter((i) => i.device == "all")
        : device == "mobile"
        ? allTutorial.filter((i) => i.device == "mobile")
        : allTutorial.filter((i) => i.device == "computer");

    setTutorialFiltered(all);
    setIsLoading(false);
  }, [allTutorial, device, isLoadingTutorial]);

  return (
    <BaseBox className="flex inset-0 flex-col md:w-[50vw] w-[100vw] md:h-[90vh] h-[100vh]">
      <div className="flex items-center justify-between md:p-4 p-4 border-b border-slate-200 dark:border-slate-700">
        <h4 className="dark:text-white font-bold md:text-lg text-base">
          {title}
        </h4>
        <button onClick={() => handleCloseBox()}>
          <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
        </button>
      </div>
      <div className="relative inset-0 w-full h-full rounded-b-xl">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-b-xl bg-slate-300 dark:bg-transparent">
            <LogoSpinner />
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col gap-2 p-4 h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              <h1 className="text-sm dark:text-white">
                <CTranslateTo
                  eng="Want to learn how to use where?"
                  pt="Quer aprender a usar onde?"
                />
              </h1>
              <AuSoftUI.UI.Select
                value={device}
                onChange={(e) => {
                  setDevice(e.target.value);
                }}
                className="w-full py-2"
                weight={"md"}
              >
                <option
                  value={"all"}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo eng="All Devices" pt="Todos os dispositivos" />
                </option>
                <option
                  value={"mobile"}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo eng="Mobile" pt="Celular" />
                </option>
                <option
                  value={"computer"}
                  className="dark:bg-ausoft-slate-950 dark:text-white"
                >
                  <CTranslateTo eng="Computer" pt="Computador" />
                </option>
              </AuSoftUI.UI.Select>
            </div>
            <div className="flex flex-col gap-4 mt-3">
              {allTutorialFiltered.length > 0 && !isLoading && (
                <>
                  {allTutorialFiltered.map((tutorial, i) => {
                    return <TutorialItem tutorial={tutorial} key={i} />;
                  })}
                </>
              )}

              {allTutorialFiltered.length <= 0 && !isLoading && (
                <div className="mt-4">
                  <AuSoftUI.Component.ListEmpty
                    action_en=""
                    action_pt=""
                    action_url=""
                    description_en="No tutorial to selected device"
                    description_pt="Sem tutorial para o dispositivo selecionado"
                    title_en="No tutoriais"
                    title_pt="Sem tutoriais"
                    hasAction={false}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </BaseBox>
  );
}
