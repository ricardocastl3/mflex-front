import { ECOOKIES } from "@/utils/enums";

class LocalStorageServices {
  keys = {
    redirectToPricing: "rc-pricing",
  };

  delKey(key:string){
    localStorage.removeItem(key)
  }

  setKey(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  getKey(key: string) {
    return localStorage.getItem(key);
  }

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
