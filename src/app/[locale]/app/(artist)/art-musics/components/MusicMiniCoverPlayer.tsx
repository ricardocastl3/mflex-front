import ASoundPlayer from "@/@components/(system)/ASoundPlayer";

export default function MusicMiniCoverPlayer({
  cover,
  type,
  url,
}: {
  type: "mini" | "large";
  cover: string;
  url?: string;
}) {
  const heightCover = type == "large" ? 150 : 60;
  const withCover = type == "large" ? "100%" : 60;

  const paddingIcon = type == "large" ? "p-2" : "p-1.5";
  const sizeIconPlayer = type == "large" ? "30" : "17";

  return (
    <div
      style={{
        height: heightCover,
        width: withCover,
        backgroundPosition: "center",
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundImage: `url(${cover})`,
      }}
      className="rounded-xl relative"
    >
      <div className="absolute inset-0 flex justify-center items-center">
        {url && (
          <ASoundPlayer
            isListMusic={true}
            padding={paddingIcon}
            size={sizeIconPlayer}
            url={`${process.env.MFLEX_SERVER_URL}/musics/listen/${url}`}
          />
        )}
      </div>
    </div>
  );
}
