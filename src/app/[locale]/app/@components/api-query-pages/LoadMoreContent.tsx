import { AuSoftUI } from "@/@components/(ausoft)";

export default function LoadMoreContent({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="mt-4">
          <AuSoftUI.Component.LoadingList
            overflow={false}
            height="h-[52vh]"
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
}
