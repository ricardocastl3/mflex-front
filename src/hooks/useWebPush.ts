import { internalApi } from "@/http/axios/api";
import { useModal } from "@/providers/app/ModalProvider";
import { useEffect, useState } from "react";

import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;

export const useWebPush = (userId: string) => {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  const { handleOpenModal } = useModal();

  useEffect(() => {
    if (!userId) return;
    const userAgent =
      typeof window !== "undefined"
        ? navigator.userAgent || navigator.vendor || window.opera
        : "";
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);

    if (isIOS) return;
    try {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        navigator.serviceWorker.register("/sw.js").then(async (reg) => {
          try {
            const existingSubscription =
              await reg.pushManager.getSubscription();
            if (existingSubscription) {
              setSubscription(existingSubscription);
              const permission = await Notification.requestPermission();
              if (permission == "granted") {
                LocalStorageServices.setSubscriber();
                LocalStorageServices.removeRedirectSubscriber();
              }
            } else {
              const permission = await Notification.requestPermission();
              if (permission !== "granted") {
                handleOpenModal("allow-notifications");
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
            return;
          }
        });
      }
    } catch (err) {
      return;
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
