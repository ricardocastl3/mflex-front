export default function ImageItem({ src }: { src: string }) {
  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        objectFit: "fill",
        height: "200px",
      }}
    ></div>
  );
}
