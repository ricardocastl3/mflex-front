export default function VideoLoading({
  image,
  isLoading,
}: {
  isLoading: boolean;
  image: string;
}) {
  return (
    <>
      {isLoading && (
        <div
          style={{
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundImage: `url(${image})`,
          }}
          className="animate-fade absolute h-full w-full inset-0 z-10"
        ></div>
      )}
    </>
  );
}
