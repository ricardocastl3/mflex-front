import { AuSoftUI } from "@/@components/(ausoft)";
import { langByCookies } from "@/http/axios/api";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useRef } from "react";

export default function CreatorTextAreaField({
  hasImage,
  onChange,
  value,
}: {
  value?: string;
  onChange: (value: string) => void;
  hasImage: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { userLogged } = useAuth();

  function handleResize() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  return (
    <AuSoftUI.UI.TextField.TextArea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        handleResize();
      }}
      placeholder={`${
        langByCookies == "pt"
          ? `Em que estás a pensar, ${userLogged?.first_name}`
          : `What are you thinking, ${userLogged?.first_name}`
      }`}
      className={`${
        hasImage
          ? "md:min-h-[6vh] min-h-[20vh] md:text-base text-sm"
          : "min-h-[20vh] md:text-lg text-base"
      } w-full md:max-h-[35vh] max-h-[30vh] focus:ring-offset-0 focus:ring-transparent focus:ring-offset-transparent overflow-hidden border-none bg-slate-200 dark:bg-slate-800/50`}
      weight={"noneFocus"}
      variant={"noneFocus"}
    />
  );
}
