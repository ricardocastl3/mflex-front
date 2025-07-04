import { internalApi } from "@/http/axios/api";
import { useEffect } from "react";

import consolere from "console-remote-client";

export default function useConsoleRemote() {
  useEffect(() => {
    consolere.connect({
      server: "/log-ct",
      channel: "mflex-solo-lobo", // required
      redirectDefaultConsoleToRemote: true, // optional, default: false
    });

    internalApi.post("/users/log-ct", {
      info: { msg: "RECONSOLE" },
    });

    window.onerror = function (msg, url, lineNo, columnNo, error) {
      console.re.log("🛑 Erro global:", {
        msg,
        url,
        lineNo,
        columnNo,
        error,
      });

      internalApi.post("/log-ct", {
        info: { msg, url, lineNo, columnNo, error },
      });
    };
  }, []);

  return null;
}
