import { ReactIcons } from "@/utils/icons";
import { motion } from "framer-motion";

export default function ARequiredTextfield({
  text,
  color = "red",
}: {
  text: string;
  color?: "red" | "orange" | "green";
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-start gap-2 text-normal ${
        color == "red"
          ? "text-red-600 dark:text-red-600"
          : color == "green"
          ? "text-green-600 dark:text-green-600"
          : "text-orange-600 dark:text-orange-600"
      }`}
    >
      <ReactIcons.FaIcon.FaInfoCircle size={14} className="mt-[0.08rem]" />
      <div>{text}</div>
    </motion.div>
  );
}
