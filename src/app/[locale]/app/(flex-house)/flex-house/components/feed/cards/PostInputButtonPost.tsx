import { modalType, useModal } from "@/providers/app/ModalProvider";
import { useCreatorProvider } from "@/providers/features/CreatorProvider";
import { IconType } from "react-icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function PostInputButtonPost({
  Icon,
  t_en,
  t_pt,
  action,
  color,
}: {
  t_pt: string;
  t_en: string;
  color: string;
  action: modalType;
  Icon: IconType;
}) {
  const { handleOpenModal } = useModal();

  return (
    <button
      onClick={() => {
        handleOpenModal(action);
      }}
      className={`${color} p-3 justify-center rounded-xl flex items-center gap-2 text-xs font-bold`}
    >
      <Icon size={15} />
      <CTranslateTo eng={t_en} pt={t_pt} />
    </button>
  );
}
