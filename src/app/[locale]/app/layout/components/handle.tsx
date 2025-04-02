import { langByCookies } from "@/http/axios/api";
import { useEffect } from "react";

export default function OpenSubscribeModal() {
  useEffect(() => {
    window.location.href = "/" + langByCookies + "/pricing";
  }, []);

  return null;
}
