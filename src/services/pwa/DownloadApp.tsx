import { ReactNode, useEffect, useState } from "react";

// Tipagem extra para o evento especial do PWA
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function DownloadAppButton({
  children,
}: {
  children: ReactNode;
}) {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    const promptEvent = deferredPrompt as unknown as BeforeInstallPromptEvent;

    promptEvent.prompt();

    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === "accepted") {
      // console.log("Usuário aceitou a instalação do PWA");
    } else {
      // console.log("Usuário recusou a instalação do PWA");
    }

    setDeferredPrompt(null);
    setShowButton(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleInstallClick}>
        {children}
      </div>
    </>
  );
}
