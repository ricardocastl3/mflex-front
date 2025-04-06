import { ReactIcons } from "@/utils/icons";
import { Dispatch, SetStateAction } from "react";

export default function AToggle({
  setValue,
  value,
  color,
  callback,
}: {
  callback?: () => void;
  color: "green" | "violet" | "blue" | "orange" | "red" | "yellow";
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => {
        setValue((state) => !state);
        if (callback) {
          callback();
        }
      }}
      className={`cursor-pointer pl-0.5 py-0.5 w-9 rounded-full ${
        value
          ? color == "blue"
            ? "bg-blue-500 dark:bg-blue-800"
            : color == "green"
            ? "bg-green-500 dark:bg-green-800"
            : color == "violet"
            ? "bg-violet-500 dark:bg-violet-800"
            : color == "red"
            ? "bg-red-500 dark:bg-red-800"
            : color == "orange"
            ? "bg-orange-500 dark:bg-orange-800"
            : color == "yellow"
            ? "bg-yellow-500 dark:bg-yellow-800"
            : ""
          : "bg-slate-500 dark:bg-slate-700"
      }`}
    >
      <ReactIcons.FaIcon.FaCircle
        size={15}
        className={`${
          value ? "translate-x-4" : "translate-x-0"
        } transition-all text-white rounded-full `}
      />
    </div>
  );
}
