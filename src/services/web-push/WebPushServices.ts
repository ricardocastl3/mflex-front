import { internalApi } from "@/http/axios/api";

import LocalStorageServices from "../localStorage/LocalStorageServices";
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;

class WebPushServices {
  subscription: any;

  async register() {
    let ret = false;
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js").then(async (reg) => {
        try {
          const newSubscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          });
          await this.sendSubscriptionToServer(newSubscription);
          LocalStorageServices.setSubscriber();
          ret = true;
        } catch (error) {
          console.error("Erro ao registrar push:", error);
        }
      });
    }
    return ret;
  }

  urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData: any = atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  async sendSubscriptionToServer(subscription: PushSubscription) {
    try {
      await internalApi.post(`/sbr`, {
        subscription,
      });
    } catch (err) {}
  }
}

export default new WebPushServices();
