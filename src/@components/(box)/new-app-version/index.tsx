import { useSocketProvider } from "@/providers/auth/SocketProvider";
import { motion } from "framer-motion";

import ContentVersion from "./content";
import BaseModal from "@/@components/(modals)/base";

export default function NewAppVersionBanner() {
  const { socketEvent } = useSocketProvider();

  return (
    <>
      {socketEvent?.name == "new-app-version" && (
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
