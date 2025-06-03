export default function ALoadingList({
  isLoading,
  height = "h-[40vh]",
  overflow = true,
}: {
  isLoading: boolean;
  height?: string;
  overflow?: boolean;
}) {
  return (
    <>
      {isLoading && (
        <div
          className={`${overflow ? height : ""} ${
            overflow ? "overflow-y-auto" : ""
          } dark:text-white flex flex-col gap-4  md:px-2 px-2 md:mt-0 mt-2`}
        >
          {Array.from({ length: 6 }).map((_, i) => {
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
