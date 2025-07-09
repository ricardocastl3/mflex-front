import React from "react";

export default function GAdsComponent({ adSlot }: { adSlot: string }) {
  React.useEffect(() => {
    try {
      const el = document.createElement("script");

      el.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2045747943237657";
      el.crossOrigin = "anonymous";
      el.async = true;

      document.head.appendChild(el);

      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Error loading Google Adsense:", err);
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2045747943237657"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
}
