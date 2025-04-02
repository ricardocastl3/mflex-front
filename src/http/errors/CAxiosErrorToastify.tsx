import { IToast } from "@/providers/app/AppProvider";
import { AxiosError } from "axios";
import { langByCookies } from "../axios/api";

export default function CAxiosErrorToastify({
  err,
  openToast,
}: {
  err: any;
  openToast: (toast: IToast) => void;
}) {
  if (err instanceof AxiosError) {
    const message = err.response?.data.message;
    const action = err.response?.data.action;

    if (!message && !action) {
      return openToast({
        title: langByCookies == "pt" ? "Ocorreu um erro" : "An error occurr",
        description:
          langByCookies == "pt"
            ? "Tente novamente a operação"
            : "Try again the operation",
        type: "error",
      });
    }

    return openToast({
      title: message,
      description: action,
      type: "error",
    });
  }

  return openToast({
    title: langByCookies == "pt" ? "Ocorreu um erro" : "An error occurr",
    description:
      langByCookies == "pt"
        ? "Tente novamente a operação"
        : "Try again the operation",
    type: "error",
  });
}
