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
        "https://firebasestorage.googleapis.com/v0/b/lora-538b7.appspot.com/o/mflex%2Ffiles%2FMFLEX%20-%20AFILIADO%20DE%20ELITE.pdf?alt=media&token=e94046b9-ff5d-41b8-b661-1dfd0834336e",
      eventUrl:
        "https://firebasestorage.googleapis.com/v0/b/lora-538b7.appspot.com/o/mflex%2Ffiles%2FMFLEX%20-%20AFILIADO%20DE%20EVENTOS.pdf?alt=media&token=e46ec28c-c8de-46af-8499-57cb995dc4e1",
    },
  },
  domain:
    process.env.NODE_ENV == "development" ? "localhost" : ".marcaflex.com",
};
