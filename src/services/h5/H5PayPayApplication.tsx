import { useEffect } from "react";

export default function H5PayPayApplication() {
  useEffect(() => {
    function handleMessage(ev: MessageEvent) {
      // ⚠️ sempre valide a origem
      if (/\.zsaipay\.com$/.test(ev.origin)) {
        try {
          const message = JSON.parse(ev.data);
          console.log("Mensagem recebida:", message);

          if (message.action === "checkSupport") {
            console.log("Suporte a pagamento:", message.paypaySupport);
          } else if (message.action === "querySystemConfig") {
            console.log(
              "Idioma:",
              message.language,
              "Versão:",
              message.version
            );
          } else if (message.action === "queryAuthCode") {
            console.log("Auth code:", message.authCode);
          }
        } catch (e) {
          console.error("Mensagem inválida", e);
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

async function sendAuthCode(authCode: string) {
  await fetch("/api/paypay/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authCode }),
  });
}

export function h5PayPaySendMessage(param: { action: string; [key: string]: any }) {
  window.parent.postMessage(JSON.stringify(param), "*");
}
