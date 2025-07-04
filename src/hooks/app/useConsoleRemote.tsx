import consolere from "console-remote-client";
import { useEffect } from "react";

export default function useConsoleRemote() {
  useEffect(() => {
    consolere.connect({
      server: "https://console.re",
      channel: "mflex-solo-lobo", // required
      redirectDefaultConsoleToRemote: true, // optional, default: false
    });
    window.onerror = function (msg, url, lineNo, columnNo, error) {
      console.re.log("🛑 Erro global:", {
        msg,
        url,
        lineNo,
        columnNo,
        error,
      });
    };
  }, []);

  return null;
}
