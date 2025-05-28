import { IJSONPrediction } from "@/http/interfaces/models/football/IJSONPrediction";

import PredictionCard from "../PredictionCard";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function OtherMarkets({
  prediction,
}: {
  prediction: IJSONPrediction;
}) {
  return (
    <PredictionCard
      prediction={prediction}
      final={{
        en: prediction.markets.others.final.en,
        pt: prediction.markets.others.final.pt,
      }}
      tips={{
        en: prediction.markets.others.tips.en,
        pt: prediction.markets.others.tips.pt,
      }}
      t_en="Other Markets"
      t_pt="Outros Mercados"
    >
      <div className="flex flex-col gap-2 divide-y-2 dark:divide-slate-800">
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              <CTranslateTo eng="Both Score" pt="Ambas marcam" />
            </h3>
          </div>
          <div className="flex ">
            <h3 className="font-bold">
              {prediction.markets.others.both_score}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              <CTranslateTo
                eng="A equipe da casa marca"
                pt="The home team score"
              />
            </h3>
          </div>
          <div className="flex">
            <h3 className="font-bold">
              {prediction.markets.others.home_team_scores}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center pt-2">
          <div className="flex ">
            <h3 className="text-[0.9rem] font-bold dark:text-white">
              <CTranslateTo
                eng="A equipe de fora marca"
                pt="The away team score"
              />
            </h3>
          </div>
          <div className="flex ">
            <h3 className="font-bold">
              {prediction.markets.others.away_team_scores}
            </h3>
          </div>
        </div>
      </div>
    </PredictionCard>
  );
}
