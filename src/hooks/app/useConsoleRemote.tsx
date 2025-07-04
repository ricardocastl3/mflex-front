import { internalApi } from "@/http/axios/api";
import { useEffect } from "react";

export default function useConsoleRemote() {
  useEffect(() => {
    window.onerror = function (msg, url, lineNo, columnNo, error) {
      internalApi.post("/users/log-ct", {
        info: { msg, url, lineNo, columnNo, error },
      });
    };
  }, []);

  return null;
}
