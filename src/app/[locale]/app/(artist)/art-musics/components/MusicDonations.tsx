import { ReactIcons } from "@/utils/icons";

export default function MusicDonations({ donations }: { donations: number }) {
  return (
    <div className="flex items-center gap-2 dark:text-emerald-400 text-emerald-700">
      <ReactIcons.FaIcon.FaDonate size={15} />
      <h1 className="text-sm">{donations || 0}</h1>
    </div>
  );
}
