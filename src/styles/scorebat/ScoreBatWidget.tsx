import { useEffect } from "react";

interface ScorebatWidgetProps {
  width?: string;
  height?: string;
}

const ScorebatWidget: React.FC<ScorebatWidgetProps> = ({
  width = "100%",
  height = "760px",
}) => {
  useEffect(() => {
    // Load Scorebat script
    const script = document.createElement("script");
    script.src = "https://www.scorebat.com/embed/embed.js?v=arrv";
    script.id = "scorebat-jssdk";
    script.async = true;

    if (!document.getElementById("scorebat-jssdk")) {
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup script on component unmount
      const scriptElement = document.getElementById("scorebat-jssdk");
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return (
    <iframe
      src="https://www.scorebat.com/embed/videofeed/?token=MjExMzQ2XzE3NDY5NjUxNzdfMzdmMWVlZGU0NTFjZWFjZTBlOWNiMTY4ZjgxMzRjZmM4Njg0Yjc2NQ=="
      frameBorder="0"
      width={width}
      height={height}
      allowFullScreen
      allow="autoplay; fullscreen"
      style={{
        width,
        height,
        overflow: "hidden",
        display: "block",
      }}
      className="_scorebatEmbeddedPlayer_"
    />
  );
};

export default ScorebatWidget;
