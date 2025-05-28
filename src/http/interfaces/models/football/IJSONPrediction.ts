export interface IJSONPrediction {
  winner: {
    draw: string;
    home: string;
    away: string;
    tips: {
      pt: string;
      en: string;
    };
    final: {
      pt: string;
      en: string;
    };
  };
  markets: {
    over_under: {
      over: {
        "0.5": string;
        "1": string;
        "1.5": string;
        "2": string;
        "2.5": string;
        "3": string;
        "3.5": string;
        "4": string;
        "4.5": string;
        "5": string;
        "5.5": string;
      };
      under: {
        "0.5": string;
        "1": string;
        "1.5": string;
        "2": string;
        "2.5": string;
        "3": string;
        "3.5": string;
        "4": string;
        "4.5": string;
        "5": string;
        "5.5": string;
      };
      tips: {
        pt: string;
        en: string;
      };
      final: {
        pt: string;
        en: string;
      };
    };
    others: {
      both_score: string;
      home_team_scores: string;
      away_team_scores: string;
      tips: {
        pt: string;
        en: string;
      };
      final: {
        pt: string;
        en: string;
      };
    };
  };
}
