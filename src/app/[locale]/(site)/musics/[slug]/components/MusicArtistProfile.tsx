import { IArtistProfile } from "@/http/interfaces/models/artists/IArtistProfile";
import { IPodcastAuthor } from "@/http/interfaces/models/IPodcastAuthor";
import { ReactIcons } from "@/utils/icons";
import { localImages } from "@/utils/images";

export default function MusicArtistProfile({
  artist,
}: {
  artist: IArtistProfile;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="p-[0.1rem] rounded-full dark:bg-yellow-600 bg-yellow-200">
        <div
          style={{
            backgroundImage: `url(${
              artist.photo || localImages.logos.flexUser.src
            })`,
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
        <h1 className="text-sm dark:text-white">{artist.name}</h1>

        <div className="flex items-center gap-2">
          <div>
            {artist.youtube && (
              <h2 className="text-[0.7rem] flex items-center gap-1 dark:text-red-400 w-fit font-bold text-red-500 px-2 py-0.5 rounded-full bg-red-200 dark:bg-red-900/30">
                <ReactIcons.AiICon.AiFillYoutube size={17} />
                YouTube
              </h2>
            )}
            {artist.facebook && (
              <h2 className="text-[0.7rem] flex items-center gap-1 dark:text-white w-fit font-bold text-blue-800 px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900/30">
                <ReactIcons.MdIcon.MdFacebook size={17} />
                Facebook
              </h2>
            )}
            {artist.tiktok && (
              <h2 className="text-[0.7rem] flex items-center gap-1 dark:text-white w-fit font-bold text-white px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900/30">
                <ReactIcons.AiICon.AiFillTikTok size={17} />
                Tik Tok
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
