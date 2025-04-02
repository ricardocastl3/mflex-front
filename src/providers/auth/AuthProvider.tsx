"use client";

import { ECOOKIES } from "@/utils/enums";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { IUserResponse } from "@/http/interfaces/responses/IUserResponse";
import { hasCookie } from "cookies-next";
import { internalApi, langByCookies } from "@/http/axios/api";
import { usePathname } from "next/navigation";

import CookieServices from "@/services/auth/CookieServices";

interface IAuthContextProps {
  isLoadingUserData: boolean;
  isUserConfirmed: boolean;
  userLogged: IUserResponse | undefined;

  handleRedirectToSign: () => void;
  fetchUserInformations: () => void;
  handleLogout: () => void;
}

export function useAuth() {
  const Auth = useContext(AuthContext);
  return Auth;
}

export const AuthContext = createContext({} as IAuthContextProps);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [userLogged, setUserLogged] = useState<IUserResponse | undefined>();
  const [isUserConfirmed, setIsUserConfirmed] = useState(false);

  const path = usePathname();

  const fetchUserInformations = useCallback(async () => {
    try {
      const authToken = hasCookie(ECOOKIES.COOKIE_USER_AUTH_TOKEN);

      if (!authToken) {
        if (path.slice(4).startsWith("app")) {
          return handleRedirectToSign();
        }
      }

      const resp = await internalApi.get<{
        user: IUserResponse;
        success: boolean;
      }>("/users/me");

      const user = resp.data.user;

      if (path.slice(4) == "sign-in") {
        window.location.href = "/" + langByCookies + "/app";
      }

      if (path.slice(4).startsWith("app")) {
        if (user.status != 1) {
          window.location.href = "/" + langByCookies;
          return;
        }
      }

      setUserLogged(user);
      setIsLoadingUserData(false);
    } catch (err) {
      console.log(path.slice(4));
      if (path.slice(4).startsWith("app")) {
        return handleRedirectToSign();
      }
      setIsLoadingUserData(false);
    }
  }, []);

  function handleRedirectToSign() {
    window.location.href = "/" + langByCookies + "/sign-in";
  }

  async function handleLogout() {
    CookieServices.setLogoutCookies();
    window.location.href = "/" + langByCookies;
  }

  useEffect(() => {
    fetchUserInformations();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoadingUserData,
        isUserConfirmed,

        fetchUserInformations,
        handleRedirectToSign,
        userLogged,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
