import { AuSoftUI } from "@/@components/(ausoft)";
import { localImages } from "@/utils/images";

import React from "react";
import CContent from "./CContent";
import ADropdownBase from "@/@components/(ausoft)/ADropdownBase";

export function CUserProfileBox() {
  return (
    <>
      <ADropdownBase
        trigger={
          <AuSoftUI.Component.Avatar
            src={localImages.logos.flexUser.src}
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
