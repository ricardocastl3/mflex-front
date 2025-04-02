export default function ALoadingList({
  isLoading,
  height = "h-[40vh]",
}: {
  isLoading: boolean;
  height?: string;
}) {
  return (
    <>
      {isLoading && (
        <div
          className={`${height} dark:text-white flex flex-col gap-4 overflow-y-auto md:px-2 px-2 md:mt-0 mt-2`}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <div
                key={i}
                className="rounded-lg md:p-6 p-16 bg-slate-200 dark:bg-slate-800 animate-pulse"
              ></div>
            );
          })}
        </div>
      )}
    </>
  );
}
