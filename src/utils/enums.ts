import { langByCookies } from "@/http/axios/api";

export const ECOOKIES = {
  COOKIE_USER_AUTH_TOKEN: "mf",
  AS_CHECKOUT_REDIRECT: "ch-rd",
  AS_LANG: "mf-lang",

  localStorage: {
    alreadySign: "nsi",
    subscriber: "sb",
    redirectSubscriber: "sbr",
  },
};

export const appConfigs = {
  title: "Marca Flex",
  api: {
    pageLoads: 50,
  },
  programs: {
    affiliate: {
      eliteUrl:
        "https://firebasestorage.googleapis.com/v0/b/lora-538b7.appspot.com/o/mfs-afs%2FMFLEX%20-%20AFILIADO%20DE%20ELITE.pdf?alt=media&token=a88cc000-a1d4-494c-afd3-770142103782",
      eventUrl:
        "https://firebasestorage.googleapis.com/v0/b/lora-538b7.appspot.com/o/mfs-afs%2FMFLEX%20-%20AFILIADO%20DE%20EVENTOS.pdf?alt=media&token=bb2c00d0-f368-4e1e-b603-2b4d534a3d8d",
    },
  },
  domain:
    process.env.NODE_ENV == "development" ? "localhost" : ".marcaflex.com",
};
