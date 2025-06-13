"use client";

import { appConfigs, ECOOKIES } from "@/utils/enums";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { IUserResponse } from "@/http/interfaces/responses/IUserResponse";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { internalApi, langByCookies } from "@/http/axios/api";
import { usePathname, useRouter } from "next/navigation";
import { ISubscriptionUsage } from "@/http/interfaces/models/subscriptions/ISubscriptionUsage";
import { IMusicSubscription } from "@/http/interfaces/models/artists/IMusicSubscription";

import CookieServices from "@/services/auth/CookieServices";
import useSubscription from "@/hooks/api/useSubscription";
import LocalStorageServices from "@/services/localStorage/LocalStorageServices";

interface IAuthContextProps {
  isLoadingUserData: boolean;
  isLoadingCurrentSubsUsage: boolean;

  isUserConfirmed: boolean;
  userLogged: IUserResponse | undefined;
  currentSubscription: ISubscriptionUsage | undefined;
  currentArtistSubscription: IMusicSubscription | undefined;

  handleFetchCurrentArtistSubs: (val: boolean) => void;
  handleFetchCurrentSubs: (val: boolean) => void;
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

  const [currentSubscription, setCurrentSubscription] = useState<
    ISubscriptionUsage | undefined
  >();

  const [fetchCurrentSubscription, setFetchCurrentSubscription] =
    useState(false);

  const [currentArtistSubscription, setCurrentArtistSubscription] = useState<
    IMusicSubscription | undefined
  >();

  const [fetchCurrentArtistSubscription, setFetchCurrentArtistSubscription] =
    useState(false);

  const { currentSubsUsage, fetchCurrentSubsUsage, isLoadingCurrentSubsUsage } =
    useSubscription();

  const path = usePathname();
  const startRoutes = path.slice(4);

  const router = useRouter();

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

      if (startRoutes == "app") {
        if (user.status == 3) return handleLogout();
      }

      if (
        startRoutes == "app" ||
        startRoutes == "sign-in" ||
        startRoutes == "forgot-pwd" ||
        startRoutes == "sign-up"
      ) {
        if (user.status == 0) {
          window.location.href = `/${langByCookies}/confirm-account`;
          return;
        }
      }

      const getCheckout = getCookie(ECOOKIES.AS_CHECKOUT_REDIRECT);
      if (getCheckout) {
        setCookie(ECOOKIES.AS_CHECKOUT_REDIRECT, "", {
          domain: appConfigs.domain,
          expires: new Date(0),
          maxAge: 0,
        });
        const resp = await internalApi.get("/events/" + getCheckout);
        setUserLogged(user);
        setIsLoadingUserData(false);
        router.push(`/${langByCookies}/events/${resp.data.event.slug}`);
        return;
      }

      if (
        startRoutes == "sign-in" ||
        startRoutes == "sign-up" ||
        startRoutes == "forgot-pwd" ||
        (startRoutes == "confirm-account" && user.status == 1)
      ) {
        LocalStorageServices.resetAllKeys();
        window.location.href = "/" + langByCookies + "/app";
        return;
      }

      setUserLogged(user);
      setIsLoadingUserData(false);
    } catch (err) {
      if (startRoutes == "app" || startRoutes == "confirm-account") {
        return handleRedirectToSign();
      } else {
        setIsLoadingUserData(false);
      }
    }
  }, []);

  function handleRedirectToSign() {
    localStorage.removeItem(ECOOKIES.localStorage.subscriber);
    window.location.href = "/" + langByCookies + "/sign-in";
  }

  async function handleLogout() {
    CookieServices.setLogoutCookies();
    LocalStorageServices.resetAllKeys();
    window.location.href = "/" + langByCookies;
  }

  function handleFetchCurrentSubs(val: boolean) {
    setFetchCurrentSubscription(val);
  }

  function handleFetchCurrentArtistSubs(val: boolean) {
    setFetchCurrentArtistSubscription(val);
  }
  useEffect(() => {
    fetchUserInformations();
  }, []);

  useEffect(() => {
    if (fetchCurrentSubscription || fetchCurrentArtistSubscription) {
      fetchCurrentSubsUsage();
    }

    if (!isLoadingCurrentSubsUsage) {
      setFetchCurrentSubscription(false);
      setFetchCurrentArtistSubscription(false);

      setCurrentArtistSubscription(currentArtistSubscription);
      setCurrentSubscription(currentSubsUsage);
    }
  }, [
    isLoadingCurrentSubsUsage,
    fetchCurrentSubscription,
    fetchCurrentArtistSubscription,
  ]);

  return (
    <AuthContext.Provider
      value={{
        isLoadingUserData,
        isLoadingCurrentSubsUsage,

        isUserConfirmed,
        currentSubscription,
        currentArtistSubscription,

        fetchUserInformations,
        handleFetchCurrentArtistSubs,
        handleFetchCurrentSubs,
        handleRedirectToSign,
        userLogged,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
