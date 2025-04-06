import { useAppProvider } from "@/providers/app/AppProvider";

import React from "react";
import CarouselCore from "./core";
import ImageItem from "./image-item";

export default function SlideItems() {
  const { isDarkMode } = useAppProvider();
  return (
    <>
      <CarouselCore>
        <ImageItem
          src={
            "https://img.freepik.com/free-vector/gradient-luxury-white-party-twitter-header-template_23-2149302516.jpg?t=st=1743867401~exp=1743871001~hmac=13dda6783de41cb44da969f6474419ceff3c45e27a77c40ee57ef07cd2fe49a2&w=1380"
          }
        />
        <ImageItem
          src={
            "https://img.freepik.com/free-psd/digital-marketing-agency-corporate-facebook-cover-template_106176-2258.jpg?t=st=1743867531~exp=1743871131~hmac=c0cb32708a440543d69a52527c0f4d3556fed93827b8c52b973f2b5d76140198&w=1800"
          }
        />
        <ImageItem
          src={
            "https://img.freepik.com/free-psd/business-promotion-corporate-facebook-cover-template_106176-339.jpg?t=st=1743867630~exp=1743871230~hmac=838862522a335fdf02580f7f21b64abdb6d76f4a776e3e1d6dfc62d91aabefa4&w=1380"
          }
        />
      </CarouselCore>
    </>
  );
}
