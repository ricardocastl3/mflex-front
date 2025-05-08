class FacebookEventServices {
  send(event_name: string, metadata?: any) {
    if (metadata) {
      window.fbq("trackCustom", event_name, metadata);
    } else {
      window.fbq("trackCustom", event_name);
    }
  }
}

export default new FacebookEventServices();
