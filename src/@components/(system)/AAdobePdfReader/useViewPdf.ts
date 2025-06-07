import { useEffect } from "react";

export default function useViewPdf() {
  useEffect(() => {
    const element = document.createElement("script");
    element.src = "https://acrobatservices.adobe.com/view-sdk/viewer.js";
    document.body.appendChild(element);
  }, []);

  return null;
}
