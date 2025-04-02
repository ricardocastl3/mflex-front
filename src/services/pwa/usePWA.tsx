import { useEffect } from "react";

export default function usePWA() {
  useEffect(() => {
    if (typeof window != "undefined") {
      const elemIcons = document.createElement("link");
      elemIcons.rel = "icon";
      elemIcons.href = "/icons/logo.png";
      document.head.appendChild(elemIcons);

      const elemTheme = document.createElement("meta");
      elemTheme.name = "theme-color";
      elemTheme.content = "#000000";
      document.head.appendChild(elemTheme);

      const elemManisfest = document.createElement("link");
      elemManisfest.rel = "manifest";
      elemManisfest.href = "/manifest.json";
      document.head.appendChild(elemManisfest);
    }
  }, []);

  return null;
}
