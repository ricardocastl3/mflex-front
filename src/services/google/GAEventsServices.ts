import { sendGAEvent } from "@next/third-parties/google";
export const GA_TRACKING_ID = "G-998HC7V4FQ";

// Declare gtag as a global variable
declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
class GAEventsServices {
  send({
    event_name,
    action,
    metadata,
  }: {
    event_name: string;
    action: string;
    metadata?: any;
  }) {
    this.event({ action, category: event_name, label: event_name });
  }

  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  pageview = (url: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_location: url,
      });
    }
  };

  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  event = ({
    action,
    category,
    label,
    value,
  }: {
    action: string;
    category: string;
    label: string;
    value?: number;
  }) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };
}

export default new GAEventsServices();
