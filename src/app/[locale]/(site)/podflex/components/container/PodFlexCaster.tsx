import { IPodcastAuthor } from "@/http/interfaces/models/IPodcastAuthor";
import { ReactIcons } from "@/utils/icons";

export default function PodFlexCaster({
  podcaster,
}: {
  podcaster: IPodcastAuthor;
}) {
  const allSources = podcaster.source.split(",");
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="p-[0.1rem] rounded-full dark:bg-yellow-500 bg-yellow-300">
        <div
          style={{
            backgroundImage: `url(${podcaster.photo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            objectFit: "cover",
            height: "48px",
            width: "48px",
          }}
          className="rounded-full bg-yellow-500"
        ></div>
      </div>
      <div className="flex-1 flex flex-col gap-1 ">
        <h1 className="text-sm dark:text-white">{podcaster.name}</h1>

        <div className="flex items-center gap-2">
          {allSources.map((sr, i) => {
            return (
              <div key={i}>
                {sr == "youtube" && (
                  <h2 className="text-[0.7rem] flex items-center gap-1 dark:text-red-400 w-fit font-bold text-red-500 px-2 py-0.5 rounded-full bg-red-200 dark:bg-red-900/30">
                    <ReactIcons.AiICon.AiFillYoutube size={17} />
                    YouTube
                  </h2>
                )}
                {sr == "facebook" && (
                  <h2 className="text-[0.7rem] flex items-center gap-1 dark:text-white w-fit font-bold text-white px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900/30">
                    <ReactIcons.MdIcon.MdFacebook size={17} />
                    Facebook
                  </h2>
                )}
                {sr == "spotify" && (
                  <h2 className="text-[0.7rem] flex items-center gap-1 dark:text-white w-fit font-bold text-white px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900/30">
                    <ReactIcons.AiICon.AiFillSpotify size={17} />
                    Spotify
                  </h2>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
