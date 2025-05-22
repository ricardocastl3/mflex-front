import { langByCookies } from "@/http/axios/api";
import { appConfigs, ECOOKIES } from "@/utils/enums";
import { getCookie, setCookie } from "cookies-next";

class LocalStorageServices {
  keys = {
    rc_pricing: "rc-pricing",
    rc_watchTv: "rc-watch-tv",
    rc_watchMovie: "rc-watch-movie",
    watch_token: "wtn",
  };

  async checkRedirects() {
    return new Promise((resolv, reject) => {
      if (this.getPricingID()) {
        this.redirectForPricing();
        return;
      }

      if (this.getWatchID()) {
        this.redirectWatchTv();
        return;
      }

      if (this.getWatchMovieID()) {
        this.redirectWatchMovie();
        return;
      }

      setTimeout(() => {
        resolv(true);
      }, 500);
    });
  }

  delKey(key: string) {
    localStorage.removeItem(key);
  }

  resetAllKeys() {
    localStorage.removeItem(this.keys.rc_pricing);
    localStorage.removeItem(this.keys.rc_watchTv);
    localStorage.removeItem(this.keys.rc_watchMovie);
  }

  setKey(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  getKey(key: string) {
    return localStorage.getItem(key);
  }

  // Tvs
  redirectWatchTv() {
    const id = this.getWatchID();
    this.resetAllKeys();
    window.location.href = `/${langByCookies}/flex-tv?chl=${id}`;
  }

  redirectWatchMovie() {
    const id = this.getWatchID();
    this.resetAllKeys();
    window.location.href = `/${langByCookies}/flex-movie?mv=${id}`;
  }

  redirectForPricing() {
    const id = this.getPricingID();
    this.delKey(this.keys.rc_pricing);
    window.location.href = `/${langByCookies}/pricing?sb=${id}`;
  }

  getWatchID() {
    const res = localStorage.getItem(this.keys.rc_watchTv);
    return res?.split("_")[1] || false;
  }

  getWatchMovieID() {
    const res = localStorage.getItem(this.keys.rc_watchMovie);
    return res?.split("_")[1] || false;
  }

  setWatchID(id: string) {
    localStorage.setItem(this.keys.rc_watchTv, `wtv_${id}`);
  }

  getWatchToken() {
    const res = getCookie(this.keys.watch_token);
    return res || false;
  }
  
  setWatchToken(token: string) {
    setCookie(this.keys.watch_token, token, {
      domain: appConfigs.domain,
      maxAge: 3600,
    });
  }

  setWatchMovieID(id: string) {
    localStorage.setItem(this.keys.rc_watchMovie, `wtm_${id}`);
  }

  // Pricing
  getPricingID() {
    const res = localStorage.getItem(this.keys.rc_pricing);
    return res?.split("_")[1] || false;
  }

  setPricingID(id: string) {
    localStorage.setItem(this.keys.rc_pricing, `pr_${id}`);
  }

  // Subscribers
  removeRedirectSubscriber() {
    localStorage.removeItem(ECOOKIES.localStorage.redirectSubscriber);
  }

  hasRedirectSubscriber() {
    if (localStorage.getItem(ECOOKIES.localStorage.redirectSubscriber)) {
      return true;
    } else {
      return false;
    }
  }
  hasSubscriber() {
    if (localStorage.getItem(ECOOKIES.localStorage.subscriber)) {
      return true;
    } else {
      return false;
    }
  }

  setRedirectSubscriber() {
    localStorage.setItem(
      ECOOKIES.localStorage.redirectSubscriber,
      `sbr_${new Date().getTime()}`
    );
  }

  setSubscriber() {
    localStorage.setItem(
      ECOOKIES.localStorage.subscriber,
      `sb_${new Date().getTime()}`
    );
  }
}

export default new LocalStorageServices();
