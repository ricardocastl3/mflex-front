self.addEventListener("push", async (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const options = {
      body: data.message,
      data: {
        url: data.url,
      },
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

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen =
    decodeURIComponent(decodeURI(event.notification.data.url)) ||
    process.env.MFLEX_NEXT_PUBLIC_URL;

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      const matchingClient = clientList.find(
        (client) => client.url === urlToOpen && "focus" in client
      );
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
