import { sendGTMEvent } from "@next/third-parties/google";

class GAEventsServices {
  send({event_name,metadata}:{event_name: string, metadata?: any}) {
    sendGTMEvent({ event: event_name, value: metadata });
  }
}

export default new GAEventsServices();
