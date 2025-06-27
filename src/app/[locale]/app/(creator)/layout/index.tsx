"use client";

import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactNode } from "react";

import CreatorRequesting from "../creator/box/CreatorRequesting";
import NoCreatorProfile from "../creator/box/NoCreatorProfile";

export default function ArtistLayout({ children }: { children: ReactNode }) {
  const { userLogged } = useAuth();

  return (
    <>
      {userLogged?.creator && !userLogged.creator.is_active && (
        <CreatorRequesting />
      )}

      {!userLogged?.creator && <NoCreatorProfile />}

      {userLogged?.creator && userLogged.creator.is_active && <>{children}</>}
    </>
  );
}
