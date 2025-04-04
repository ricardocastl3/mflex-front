import CookieServices from "@/services/auth/CookieServices";
import axios from "axios";

export const langByCookies = CookieServices.getLocale();

export const internalApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "accept-language": langByCookies,
    Authorization: `Bearer ${process.env.MFLEX_NEXT_API_TOKEN}`,
  },
});
