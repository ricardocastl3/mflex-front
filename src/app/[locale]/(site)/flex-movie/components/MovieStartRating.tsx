import { ITVMovieSafed } from "@/http/interfaces/models/tv/ITVMovie";
import { ReactIcons } from "@/utils/icons";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";

interface MovieStartRatingProps {
  item: ITVMovieSafed;
}

export default function MovieStartRating({ item }: MovieStartRatingProps) {
  const rating = Number(item.rating) || 0;
  const normalizedRating = Math.round((rating / 10) * 5);

  return (
    <div className="flex items-center gap-2 flex-wrap w-full">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const ratingValue = index + 1;
          const isFilled = ratingValue <= normalizedRating;

          return (
            <div key={index} className="">
              {isFilled ? (
                <ReactIcons.PiIcon.PiStarFill
                  size={16}
                  className="text-yellow-500"
                />
              ) : (
                <ReactIcons.PiIcon.PiStar
                  size={16}
                  className="text-yellow-500"
                />
              )}
            </div>
          );
        })}
      </div>
      <span className="mt-0.5 md:text-[0.88rem] text-[0.9rem] dark:text-gray-400 text-slate-600">
        {`${rating}/10 `}
        <CTranslateTo eng="Rating" pt="Avaliação" />
      </span>
    </div>
  );
}
