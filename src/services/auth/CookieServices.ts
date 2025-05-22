import { appConfigs, ECOOKIES } from "@/utils/enums";
import { getCookie, hasCookie, setCookie } from "cookies-next";

class CookieServices {
  keys = {
    watch_token: "wtn",
  };
  getLocale() {
    let lang = "";
    if (typeof window != "undefined") {
      const navigatorLang =
        navigator.language.slice(0, 2) === "pt" ? "pt" : "en";

      lang = hasCookie(ECOOKIES.AS_LANG)
        ? (getCookie(ECOOKIES.AS_LANG) as string)
        : navigatorLang;
    }
    return lang;
  }

  getWatchToken() {
    const res = getCookie(this.keys.watch_token);
    return res || false;
  }

  setWatchToken(token: string) {
    setCookie(this.keys.watch_token, token, {
      domain: appConfigs.domain,
    });
  }

  deleteWatchCookie() {
    setCookie(this.keys.watch_token, "", {
      domain:
        process.env.NODE_ENV == "production" ? appConfigs.domain : "localhost",
      expires: new Date(0),
      maxAge: 0,
    });
  }

  setLogoutCookies() {
    setCookie(ECOOKIES.COOKIE_USER_AUTH_TOKEN, "", {
      domain:
        process.env.NODE_ENV == "production" ? appConfigs.domain : "localhost",
      expires: new Date(0),
      maxAge: 0,
    });
  }
}

export default new CookieServices();
