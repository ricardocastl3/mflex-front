import { useEffect } from "react";

export const useWebPushLoading = () => {
  useEffect(() => {
    window._at = window._at || {};
    window._at.track =
      window._at.track ||
      function () {
        (window._at.track.q = window._at.track.q || []).push(arguments);
      };

    window._at.owner = "5c138b6436a4";
    window._at.idSite = "30989";
    window._at.attributes = {};

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src = "//cdn.aimtell.com/trackpush/trackpush.min.js";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};
