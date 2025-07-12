import { useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { YouTubeEmbed } from "@next/third-parties/google";
import { ITutorial } from "@/http/interfaces/models/ITutorials";

export default function TutorialItem({ tutorial }: { tutorial: ITutorial }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-3 rounded-xl border border-slate-300 dark:border-slate-800">
      <div
        onClick={() => setOpen((state) => !state)}
        className="flex items-center justify-between gap-4 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <ReactIcons.AiICon.AiFillYoutube
            className="dark:text-red-600 text-red-600"
            size={18}
          />
          <h1 className="font-bold text-sm dark:text-white">
            {tutorial.title}
          </h1>
        </div>
        <ReactIcons.PiIcon.PiCaretUp
          className={`${
            open ? "rotate-180" : ""
          } transition-all dark:text-white`}
          size={16}
        />
      </div>
      {open && (
        <div className="p-2 w-full animate-fade-up rounded-xl mt-4">
          <div className="w-full rounded-xl">
            <YouTubeEmbed
              videoid={tutorial.url}
              style={
                window.innerWidth > 765
                  ? "width: 100%; height: 100%; border-radius: 10px;"
                  : "width: 100%; height: 100%;"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
