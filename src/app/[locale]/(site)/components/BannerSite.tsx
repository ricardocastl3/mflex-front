import { localImages } from "@/utils/images";

export default function BannerSite({ banner }: { banner: number }) {
  let image_url;

  switch (banner) {
    case 1:
      image_url = localImages.banner.flex1.src;
      break;
    case 2:
      image_url = localImages.banner.flex2.src;
      break;
    case 3:
      image_url = localImages.banner.flex3.src;
      break;
    case 4:
      image_url = localImages.banner.flex4.src;
      break;
    case 5:
      image_url = localImages.banner.flex5.src;
      break;
    case 6:
      image_url = localImages.banner.flex6.src;
      break;
  }

  return (
    <div
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundImage: `url(${image_url})`,
      }}
      className="md:h-[50vh] h-[12vh] w-full justify-self-end"
    ></div>
  );
}
