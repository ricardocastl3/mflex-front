export const ECOOKIES = {
  COOKIE_USER_AUTH_TOKEN: "mf",
  AS_CHECKOUT_REDIRECT: "ch-rd",
  AS_LANG: "mf-lang",

  localStorage: {
    alreadySign: "nsi",
  },
};

export const appConfigs = {
  title: "Marca Flex",
  domain:
    process.env.NODE_ENV == "development" ? "localhost" : ".marcaflex.com",
};
