import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import { ReactIcons } from "@/utils/icons";

export default function LiveGame() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <ReactIcons.MdIcon.MdCircle
          size={20}
          className="text-green-500 animate-pulse"
        />
        <h1 className="text-xl font-bold">
          <CTranslateTo eng="Live Game" pt="Jogos Ao Vivo" />
        </h1>
      </div>
      <div className="p-8 bg-white"></div>
    </div>
  );
}
