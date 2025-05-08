"use client";

import React, { useEffect } from "react";

interface FacebookPixelProps {
  pixelId: string;
}

const FacebookPixel: React.FC<FacebookPixelProps> = ({ pixelId }) => {
  useEffect(() => {
    if (!window.fbq) {
      window.fbq = function (...args: any[]) {
        window.fbq.callMethod
          ? window.fbq.callMethod(...args)
          : window.fbq.queue.push(args);
      };
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = "2.0";
      window.fbq.queue = [];

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.body.appendChild(script);

      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    }
  }, []);

  return null;
};

export default FacebookPixel;
