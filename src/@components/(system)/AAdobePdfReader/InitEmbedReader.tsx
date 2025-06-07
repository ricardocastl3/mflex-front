import { useEffect } from "react";
import { viewerConfig } from "./configs";

import ViewSDKClient from "./ViewSDKClient";

export default function InitEmbedAdobeReader({
  divMaster,
  title,
  url,
}: {
  divMaster: string;
  title: string;
  url: string;
}) {
  useEffect(() => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile(divMaster, title, url, viewerConfig);
    });

    return () => {
      viewSDKClient.destroy();
    };
  }, [divMaster, title, url]);

  return null;
}
