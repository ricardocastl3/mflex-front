import { langByCookies } from "@/http/axios/api";
import { localImages } from "@/utils/images";

export const socialShares = [
  {
    title: langByCookies == "pt" ? "Copiar Link" : "Copy Link",
    Icon: localImages.social.link,
    type: "copy",
  },
  {
    title: "Facebook",
    Icon: localImages.social.facebook,
    type: "facebook",
  },
  {
    title: "WhatsApp",
    Icon: localImages.social.whatsapp,
    type: "whatsapp",
  },

  /*  {
    title: "TikTok",
    Icon: localImages.social.tiktok,
    type: "tiktok",
  },
  {
    title: "Instagram",
    Icon: localImages.social.instagram,
    type: "instagram",
  }, */
  {
    title: "LinkedIn",
    Icon: localImages.social.linkedin,
    type: "linkedin",
  },
];
