import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";
import { useAuth } from "@/providers/auth/AuthProvider";

import React from "react";
import CContent from "./CContent";
import ADropdownBase from "@/@components/(ausoft)/ADropdownBase";

export function CUserProfileBox() {
  const { userLogged } = useAuth();

  return (
    <>
      <ADropdownBase
        trigger={
          <AuSoftUI.Component.Avatar
            src={
              userLogged && userLogged.photo
                ? userLogged.photo
                : localImages.logos.flexUser.src
            }
            size={40}
            width={35}
            wsite="h-9 w-9"
          />
        }
        MobileContent={(call) => {
          return <CContent callback={() => call.callback()} />;
        }}
        DesktopContentElement={(e) => (
          <CContent
            callback={() => {
              if (e.callback) {
                e.callback();
              }
            }}
          />
        )}
        DesktopContent={<></>}
      />
    </>
  );
}
