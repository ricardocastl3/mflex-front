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
        "https://cdn.marcaflex.com/mfs/afs/MFLEX%20-%20AFILIADO%20DE%20ELITE.pdf",
      eventUrl:
        "https://cdn.marcaflex.com/mfs/afs/MFLEX%20-%20AFILIADO%20DE%20EVENTOS.pdf",
    },
  },
  domain:
    process.env.NODE_ENV == "development" ? "localhost" : ".marcaflex.com",
};
