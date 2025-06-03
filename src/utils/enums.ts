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
  domain:
    process.env.NODE_ENV == "development" ? "localhost" : ".marcaflex.com",
};
