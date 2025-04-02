"use client";

import { ReactIcons } from "@/utils/icons";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function TextFieldWithPwd({
  name,
  requiredField = false,
  disabled = false,
}: {
  name: string;
  requiredField: boolean;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);

  const { register } = useFormContext();

  return (
    <>
      <div
        className={` ${
          requiredField
            ? "border-red-500 dark:border-red-800/80"
            : "border-slate-300 dark:border-slate-700/80"
        } text-sm flex items-center focus:ring focus:ring-blue-800/40 focus:ring-offset-blue-600 focus:ring-offset-1 rounded-lg bg-transparent text-slate-800 dark:text-slate-100 border-[1.8px] `}
      >
        <input
          disabled={disabled ? true : false}
          {...register(name)}
          type={show ? "text" : "password"}
          placeholder="Ex.: 123456..."
          className="p-3.5 bg-transparent w-full disabled:cursor-not-allowed "
        />
        <button
          type="button"
          onClick={() => setShow((state) => !state)}
          className="md:w-10 w-9"
        >
          {show && <ReactIcons.PiIcon.PiEye size={20} />}
          {!show && <ReactIcons.PiIcon.PiEyeClosed size={20} />}
        </button>
      </div>
    </>
  );
}
