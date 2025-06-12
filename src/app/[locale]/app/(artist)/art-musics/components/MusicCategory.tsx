import { ReactIcons } from "@/utils/icons";

export default function MusicCategory({ category }: { category: string }) {
  return (
    <>
      <h1 className="h-fit w-fit text-xs gap-2 px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-800/40 dark:text-green-400 text-green-800 flex items-center">
        <ReactIcons.HiIcon.HiTicket size={18} />
        {category}
      </h1>
    </>
  );
}
