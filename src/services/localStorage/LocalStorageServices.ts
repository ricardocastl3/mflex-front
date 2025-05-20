import { langByCookies } from "@/http/axios/api";
import { ECOOKIES } from "@/utils/enums";

class LocalStorageServices {
  keys = {
    rc_pricing: "rc-pricing",
    rc_watchTv: "rc-watch-tv",
    rc_watchMovie: "rc-watch-movie",
  };

  delKey(key: string) {
    localStorage.removeItem(key);
  }

  resetAllKeys() {
    localStorage.removeItem(this.keys.rc_pricing);
    localStorage.removeItem(this.keys.rc_watchTv);
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
    this.resetAllKeys();
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
