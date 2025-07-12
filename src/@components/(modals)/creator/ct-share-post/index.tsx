import { AuSoftUI } from "@/@components/(ausoft)";
import { BaseBox } from "@/@components/(box)/BaseBox";
import { useModal } from "@/providers/app/ModalProvider";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useResourceProvider } from "@/providers/features/ResourceProvider";
import { ReactIcons } from "@/utils/icons";
import { socialShares } from "./socials";
import { useAppProvider } from "@/providers/app/AppProvider";
import { IMusic } from "@/http/interfaces/models/artists/IMusic";
import { IEvent } from "@/http/interfaces/models/organizer/IEvent";
import { INews } from "@/http/interfaces/models/INews";
import { IPodcast } from "@/http/interfaces/models/IPodCast";

import React, { useState } from "react";
import BaseModal from "../../base";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Image from "next/image";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function CreatorSharePostModal() {
  //Contexts
  const { handleOpenModal } = useModal();
  const { selectedResource, handleSelectResource, selectedResourceType } =
    useResourceProvider();
  const { handleAddToastOnArray } = useAppProvider();

  // Controls
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClose() {
    handleSelectResource(undefined);
    handleOpenModal("");
  }

  function handleGetLink(type: string) {
    if (!selectedResource) return;

    let nextUrl = "";
    let sharedLink = "";

    if (selectedResourceType == "post") {
      nextUrl = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/share/ctr-post/${selectedResource.id}`;
    } else if (selectedResourceType == "music") {
      const music = selectedResource as IMusic;
      nextUrl = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/musics/${music.slug}`;
    } else if (selectedResourceType == "event") {
      const event = selectedResource as IEvent;
      nextUrl = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/events/${event.slug}`;
    } else if (selectedResourceType == "news") {
      const news = selectedResource as INews;
      nextUrl = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/news/${news.slug}`;
    } else if (selectedResourceType == "podcast") {
      const podcast = selectedResource as IPodcast;
      nextUrl = `${process.env.MFLEX_NEXT_PUBLIC_URL}/${langByCookies}/podflex/${podcast.slug}`;
    }

    switch (type) {
      case "facebook":
        sharedLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          nextUrl
        )}`;
        break;

      case "linkedin":
        sharedLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          nextUrl
        )}`;
        break;

      case "whatsapp":
        const message = `${
          langByCookies == "pt"
            ? `Este poste na Marca Flex está incrível!\n\n→ Saiba mais: ${nextUrl}`
            : `This Marca Flex post is amazing!\n\n→ Know more: ${nextUrl}`
        }`;

        sharedLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;

      case "copy":
        sharedLink = nextUrl;
        break;
    }

    return sharedLink;
  }

  async function handleShare(type: string) {
    try {
      if (!selectedResource) return;

      setIsSubmitting(true);
      await internalApi.post("/users/shares", { id: selectedResource?.id });

      const sharedLink = handleGetLink(type);

      window.open(sharedLink);
      handleClose();
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  return (
    <BaseModal callbackClose={() => handleClose()}>
      <BaseBox className="relative md:w-[40vw] w-[90vw] h-fit flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between md:p-4 p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <h4 className="text-base dark:text-white font-bold">
                <CTranslateTo eng="Share in..." pt="Partilhar com.." />
              </h4>
            </div>
            <button onClick={() => handleClose()}>
              <ReactIcons.BiIcon.BiX size={25} className="dark:text-white" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center pb-7">
            <div className="grid grid-cols-4 justify-center md:gap-7 gap-5 py-5  md:px-8 px-4 ">
              {socialShares.map((social, i) => {
                return (
                  <div key={i}>
                    {social.type == "copy" && (
                      <AuSoftUI.Component.Clipboard
                        text={handleGetLink("copy")!}
                        title_en="Link Copied"
                        title_pt="Link copiado"
                        body={
                          <button className="hover:scale-105 scale-100 transition-all flex flex-col items-center gap-2">
                            <Image
                              height={window.innerWidth > 765 ? 40 : 30}
                              width={window.innerWidth > 765 ? 40 : 30}
                              src={social.Icon}
                              alt=""
                            />
                            <h1 className="font-bold dark:text-white md:text-sm text-[0.8rem]">
                              {social.title}
                            </h1>
                          </button>
                        }
                      />
                    )}
                    {social.type != "copy" && (
                      <button
                        onClick={() => handleShare(social.type)}
                        className="hover:scale-105 scale-100 transition-all flex flex-col items-center gap-2"
                      >
                        <Image
                          height={window.innerWidth > 765 ? 40 : 30}
                          width={window.innerWidth > 765 ? 40 : 30}
                          src={social.Icon}
                          alt=""
                        />
                        <h1 className="font-bold dark:text-white md:text-sm text-[0.8rem]">
                          {social.title}
                        </h1>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col md:px-4 px-7 gap-2 items-center text-center pt-4 border-t border-slate-300 dark:border-slate-800">
              <h1 className="font-bold dark:text-yellow-500 text-yellow-600 text-base">
                <CTranslateTo
                  eng="Share with your friends"
                  pt="Compartilhe com os seus amigos"
                />
              </h1>
              <h1 className="dark:text-white text-sm">
                <CTranslateTo
                  eng="Your friends will love to receive your share, go ahead 🚀"
                  pt="Seus amigos vão adorar receber seu compartilhamento, pode avançar 🚀"
                />
              </h1>
            </div>
          </div>
        </div>
        <div className="md:py-4 py-4 md:px-8 px-4 border-t border-slate-300 dark:border-slate-800 flex items-center md:gap-4 gap-2">
          <AuSoftUI.UI.Button
            onClick={handleClose}
            size={"sm"}
            variant={"outline"}
            className="w-full justify-center rounded-full"
          >
            <CTranslateTo eng="Close" pt="Fechar" />
          </AuSoftUI.UI.Button>

          <AuSoftUI.Component.RegisterProgress
            rounded="all"
            isOpened={isSubmitting}
          />
        </div>
      </BaseBox>
    </BaseModal>
  );
}
