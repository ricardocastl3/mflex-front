import { internalApi } from "@/http/axios/api";
import { useEffect, useState } from "react";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;

export const useWebPush = (userId: string) => {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    if (!userId) return;

    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js").then(async (reg) => {
        try {
          const existingSubscription = await reg.pushManager.getSubscription();
          if (existingSubscription) {
            setSubscription(existingSubscription);
          } else {
            const permission = await Notification.requestPermission();
            if (permission !== "granted") {
              console.error("Permissão de notificação negada pelo usuário.");
              return;
            }

            const newSubscription = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
            });
            setSubscription(newSubscription);
            await sendSubscriptionToServer(newSubscription);
          }
        } catch (error) {
          console.error("Erro ao registrar push:", error);
        }
      });
    }
  }, [userId]);

  return subscription;
};

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData: any = atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
};

const sendSubscriptionToServer = async (subscription: PushSubscription) => {
  try {
    await internalApi.post(`/sbr`, {
      subscription,
    });
  } catch (err) {}
};
