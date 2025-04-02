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
    /*
    if (data.sound) {
      await playSound(data.sound);
    }*/
    await self.registration.showNotification(data.title, options);
  } catch (error) {
    console.error("Erro ao processar push:", error);
  }
});

/*
const playSound = async (soundUrl) => {
  if (!soundUrl) return;

  try {
    const howl = new howlImport.Howl({ src: [soundUrl], loop: false });
    howl.play();
  } catch (error) {
    console.error("Erro ao carregar ou reproduzir som:", error);
    throw error;
  }
};

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
});
*/
