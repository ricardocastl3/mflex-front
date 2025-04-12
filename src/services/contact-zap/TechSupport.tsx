import { useModal } from "@/providers/app/ModalProvider";
import { ReactIcons } from "@/utils/icons";
import { usePathname } from "next/navigation";

export default function TechSupport() {
  const path = usePathname();
  const { handleOpenModal } = useModal();

  let bottomSafe = "";
  let rightSafe = "";

  if (typeof window != "undefined") {
    if (window.innerWidth >= 768) {
      bottomSafe = "3.5rem";
      rightSafe = "2rem";
    } else {
      bottomSafe = "5.5rem";
      rightSafe = "1.5rem";
    }

    if (!path.startsWith("/en/app") && !path.startsWith("/pt/app")) {
      return (
        <div
          style={{
            bottom: bottomSafe,
            right: rightSafe,
          }}
          className="fixed  z-20 animate-fade-up"
        >
          <div className="dark:bg-orange-900 bg-orange-600 animate-pulse p-1.5 rounded-full">
            <button
              onClick={() => handleOpenModal("technical-support")}
              className="p-2 flex cursor-pointer hover:animate-jump hover:dark:bg-orange-700 hover:bg-orange-600 transition-all duration-300 dark:bg-orange-600 bg-orange-500 text-white rounded-full"
            >
              <ReactIcons.AiICon.AiFillCustomerService size={28} />
            </button>
          </div>
        </div>
      );
    }
  }

  return <></>;
}
