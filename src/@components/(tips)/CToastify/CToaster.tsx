import { useAppProvider } from "@/providers/app/AppProvider";
import CToastify from "./CToastify";

export default function CToaster() {
  const { openToast } = useAppProvider();

  return (
    <>
      {openToast && (
        <>
          {openToast.map((toast, i) => {
            return (
              <CToastify
                key={i}
                index={i + 1}
                toast={toast}
                position="top-right"
              />
            );
          })}
        </>
      )}
    </>
  );
}
