import { IJSONPrediction } from "@/http/interfaces/models/football/IJSONPrediction";

import PredictionCard from "../../PredictionCard";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import OverUnderDetails from "./OverUnderDetails";

export default function OverUnder({
  prediction,
}: {
  prediction: IJSONPrediction;
}) {
  return (
    <PredictionCard
      prediction={prediction}
      final={{
        en: prediction.markets.over_under.final.en,
        pt: prediction.markets.over_under.final.pt,
      }}
      tips={{
        en: prediction.markets.over_under.tips.en,
        pt: prediction.markets.over_under.tips.pt,
      }}
      t_en="Goals in the match"
      t_pt="Goals na partida"
    >
      <div className="grid md:grid-cols-2 grid-cols-1 md:divide-x-2 divide-x-0  dark:divide-slate-800">
        <div className="flex flex-col">
          <div className="md:rounded-none rounded-t-xl bg-slate-200 dark:bg-slate-800/60 px-2 py-4">
            <h1 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              <CTranslateTo eng="Over Under" pt="Mais de" />
            </h1>
          </div>
          <OverUnderDetails />
        </div>
        <div className="flex flex-col">
          <div className="md:rounded-none rounded-t-xl bg-slate-200 dark:bg-slate-800/60 px-2 py-4">
            <h1 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              <CTranslateTo eng="Under Over" pt="Menos de" />
            </h1>
          </div>
          <OverUnderDetails />
        </div>
      </div>
    </PredictionCard>
  );
}
