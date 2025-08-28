import { useEffect } from "react";

export default function useH5App() {
  useEffect(() => {
    // Listen for messages
    window.addEventListener("message", function (ev) {
      if (/\.zsaipay\.com$/.test(ev.origin)) {
        // Control the message source
        let message = JSON.parse(ev.data);
        // The'message' must have a member 'action', indicating the result of what action.
        if (message["action"] === "...") {
          //... Execute
        } else if (message["action"] === "....") {
          //... Execute
        }
      }
    });
  }, []);

  return null;
}

function sendMessage(param: { action: string; [key: string]: any }) {
  window.parent.postMessage(JSON.stringify(param), "*");
}
