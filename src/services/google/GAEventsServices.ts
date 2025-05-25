import { sendGAEvent } from "@next/third-parties/google";

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
    sendGAEvent(event_name, action, metadata);
  }
}

export default new GAEventsServices();
