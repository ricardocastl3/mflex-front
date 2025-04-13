self.addEventListener("push", async (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const options = {
      body: data.message,
      priority: "high",
      time_to_live: 0,
      icon: "/icons/logo.png",
      badge: "/icons/badge.png",
      sound: true,
      vibrate: [200, 100, 200],
      android: {
        sound: true,
        priority: "high",
        channelId: "default",
      },
      ios: {
        sound: true,
      },
    };

    await self.registration.showNotification(data.title, options);
  } catch (error) {
    console.error("Erro ao processar push:", error);
  }
});
