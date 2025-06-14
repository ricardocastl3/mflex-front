import { useAuth } from "@/providers/auth/AuthProvider";
import { ReactNode } from "react";

import ArtistRequesting from "../artist/box/ArtistRequesting";
import NoArtistProfile from "../artist/box/NoArtistProfile";

export default function ArtistLayout({ children }: { children: ReactNode }) {
  const { userLogged } = useAuth();

  return (
    <>
      {userLogged?.artist_profile &&
        userLogged.artist_profile.request_profile &&
        !userLogged.artist_profile.is_online && <ArtistRequesting />}

      {!userLogged?.artist_profile && <NoArtistProfile />}

      {userLogged?.artist_profile && userLogged.artist_profile.is_online && (
        <>{children}</>
      )}
    </>
  );
}
