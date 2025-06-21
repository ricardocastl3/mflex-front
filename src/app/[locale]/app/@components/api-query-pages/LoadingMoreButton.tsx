import { AuSoftUI } from "@/@components/(ausoft)";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function LoadingMoreButton({
  has,
  isLoading,
  fetchMore,
  size,
}: {
  has: boolean;
  isLoading: boolean;
  fetchMore: () => void;
  size?: "lg" | "md" | "sm";
}) {
  return (
    <>
      {!isLoading && has && (
        <div className="md:px-2 px-4 md:pt-2 pt-2">
          <AuSoftUI.UI.Button
            onClick={fetchMore}
            className="w-full rounded-full justify-center"
            variant={"outline"}
            size={size || "lg"}
          >
            <CTranslateTo eng="Load More" pt="Carregar Mais" />
          </AuSoftUI.UI.Button>
        </div>
      )}
    </>
  );
}
