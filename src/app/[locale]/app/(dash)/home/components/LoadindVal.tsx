export default function LoadingVal({
  isLoading,
  val,
}: {
  isLoading: boolean;
  val: number;
}) {
  return (
    <>
      {isLoading && (
        <h1 className="bg-yellow-600 dark:bg-yellow-500 p-2 w-fit rounded-full animate-pulse"></h1>
      )}

      {!isLoading && (
        <h1 className="text-[1.1rem] animate-fade font-bold text-yellow-600 dark:text-yellow-500">
          {val}
        </h1>
      )}
    </>
  );
}
