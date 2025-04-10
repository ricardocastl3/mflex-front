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
        <h1 className="text-base text-yellow-600 dark:text-yellow-500 p-2 rounded-full animate-pulse"></h1>
      )}

      {!isLoading && (
        <h1 className="text-base text-yellow-600 dark:text-yellow-500">
          {val}
        </h1>
      )}
    </>
  );
}
