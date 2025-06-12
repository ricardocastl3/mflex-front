import { ReactIcons } from "@/utils/icons";

export default function MusicViews({ views }: { views: number }) {
  return (
    <div className="flex items-center gap-2 dark:text-slate-400 text-slate-700">
      <ReactIcons.AiICon.AiFillEye size={15} />
      <h1 className="text-sm ">{views || 0}</h1>
    </div>
  );
}
