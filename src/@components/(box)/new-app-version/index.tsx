import { motion } from "framer-motion";
import { useAppProvider } from "@/providers/app/AppProvider";

import ContentVersion from "./content";
import BaseModal from "@/@components/(modals)/base";

export default function NewAppVersionBanner() {
  const { appSystemModals } = useAppProvider();

  return (
    <>
      {appSystemModals.openNewVersion && (
        <>
          {window.innerWidth > 765 && (
            <motion.div
              initial={{ translateY: "2rem" }}
              animate={{ translateY: "0" }}
              className="fixed bottom-8 right-8 z-40"
            >
              <ContentVersion />
            </motion.div>
          )}

          {window.innerWidth < 765 && (
            <BaseModal callbackClose={() => {}}>
              <ContentVersion />
            </BaseModal>
          )}
        </>
      )}
    </>
  );
}
