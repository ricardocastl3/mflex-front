interface TeamStatistics {
  get: string;
  parameters: {
    league: string;
    season: string;
    team: string;
    date: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: {
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      flag: string;
      season: number;
    };
    team: {
      id: number;
      name: string;
      logo: string;
    };
    form: string;
    fixtures: {
      played: {
        home: number;
        away: number;
        total: number;
      };
      wins: {
        home: number;
        away: number;
        total: number;
      };
      draws: {
        home: number;
        away: number;
        total: number;
      };
      loses: {
        home: number;
        away: number;
        total: number;
      };
    };
    goals: {
      for: {
        total: {
          home: number;
          away: number;
          total: number;
        };
        average: {
          home: string;
          away: string;
          total: string;
        };
        minute: {
          [key: string]: {
            total: number | null;
            percentage: string | null;
          };
        };
        under_over: {
          [key: string]: {
            over: number;
            under: number;
          };
        };
      };
      against: {
        total: {
          home: number;
          away: number;
          total: number;
        };
        average: {
          home: string;
          away: string;
          total: string;
        };
        minute: {
          [key: string]: {
            total: number | null;
            percentage: string | null;
          };
        };
        under_over: {
          [key: string]: {
            over: number;
            under: number;
          };
        };
      };
    };
    biggest: {
      streak: {
        wins: number;
        draws: number;
        loses: number;
      };
      wins: {
        home: string;
        away: string;
      };
      loses: {
        home: string;
        away: string;
      };
      goals: {
        for: {
          home: number;
          away: number;
        };
        against: {
          home: number;
          away: number;
        };
      };
    };
    clean_sheet: {
      home: number;
      away: number;
      total: number;
    };
    failed_to_score: {
      home: number;
      away: number;
      total: number;
    };
    penalty: {
      scored: {
        total: number;
        percentage: string;
      };
      missed: {
        total: number;
        percentage: string;
      };
      total: number;
    };
    lineups: any[];
    cards: {
      yellow: {
        [key: string]: {
          total: number | null;
          percentage: string | null;
        };
      };
      red: {
        [key: string]: {
          total: number | null;
          percentage: string | null;
        };
      };
    };
  };
}

export type { TeamStatistics };

export const exampleTeamStatistics: TeamStatistics = {
  get: "teams/statistics",
  parameters: {
    league: "254",
    season: "2021",
    team: "3002",
    date: "2025-05-12",
  },
  errors: [],
  results: 11,
  paging: {
    current: 1,
    total: 1,
  },
  response: {
    league: {
      id: 254,
      name: "NWSL Women",
      country: "USA",
      logo: "https://media.api-sports.io/football/leagues/254.png",
      flag: "https://media.api-sports.io/flags/us.svg",
      season: 2021,
    },
    team: {
      id: 3002,
      name: "Seattle Reign FC",
      logo: "https://media.api-sports.io/football/teams/3002.png",
    },
    form: "DWLLLWLLWLWWWLWWWDWWWDLWL",
    fixtures: {
      played: {
        home: 13,
        away: 12,
        total: 25,
      },
      wins: {
        home: 8,
        away: 5,
        total: 13,
      },
      draws: {
        home: 1,
        away: 2,
        total: 3,
      },
      loses: {
        home: 4,
        away: 5,
        total: 9,
      },
    },
    goals: {
      for: {
        total: {
          home: 23,
          away: 15,
          total: 38,
        },
        average: {
          home: "1.8",
          away: "1.3",
          total: "1.5",
        },
        minute: {
          "0-15": {
            total: 10,
            percentage: "26.32%",
          },
          "16-30": {
            total: 7,
            percentage: "18.42%",
          },
          "31-45": {
            total: 7,
            percentage: "18.42%",
          },
          "46-60": {
            total: 8,
            percentage: "21.05%",
          },
          "61-75": {
            total: 2,
            percentage: "5.26%",
          },
          "76-90": {
            total: 3,
            percentage: "7.89%",
          },
          "91-105": {
            total: 1,
            percentage: "2.63%",
          },
          "106-120": {
            total: null,
            percentage: null,
          },
        },
        under_over: {
          "0.5": {
            over: 18,
            under: 7,
          },
          "1.5": {
            over: 12,
            under: 13,
          },
          "2.5": {
            over: 6,
            under: 19,
          },
          "3.5": {
            over: 1,
            under: 24,
          },
          "4.5": {
            over: 1,
            under: 24,
          },
        },
      },
      against: {
        total: {
          home: 14,
          away: 12,
          total: 26,
        },
        average: {
          home: "1.1",
          away: "1.0",
          total: "1.0",
        },
        minute: {
          "0-15": {
            total: 7,
            percentage: "30.43%",
          },
          "16-30": {
            total: 2,
            percentage: "8.70%",
          },
          "31-45": {
            total: 3,
            percentage: "13.04%",
          },
          "46-60": {
            total: 5,
            percentage: "21.74%",
          },
          "61-75": {
            total: 4,
            percentage: "17.39%",
          },
          "76-90": {
            total: 2,
            percentage: "8.70%",
          },
          "91-105": {
            total: null,
            percentage: null,
          },
          "106-120": {
            total: null,
            percentage: null,
          },
        },
        under_over: {
          "0.5": {
            over: 16,
            under: 9,
          },
          "1.5": {
            over: 8,
            under: 17,
          },
          "2.5": {
            over: 2,
            under: 23,
          },
          "3.5": {
            over: 0,
            under: 25,
          },
          "4.5": {
            over: 0,
            under: 25,
          },
        },
      },
    },
    biggest: {
      streak: {
        wins: 3,
        draws: 1,
        loses: 3,
      },
      wins: {
        home: "5-1",
        away: "0-3",
      },
      loses: {
        home: "0-3",
        away: "3-1",
      },
      goals: {
        for: {
          home: 5,
          away: 3,
        },
        against: {
          home: 3,
          away: 3,
        },
      },
    },
    clean_sheet: {
      home: 5,
      away: 4,
      total: 9,
    },
    failed_to_score: {
      home: 4,
      away: 3,
      total: 7,
    },
    penalty: {
      scored: {
        total: 4,
        percentage: "100.00%",
      },
      missed: {
        total: 0,
        percentage: "0%",
      },
      total: 4,
    },
    lineups: [],
    cards: {
      yellow: {
        "0-15": {
          total: 2,
          percentage: "5.71%",
        },
        "16-30": {
          total: 4,
          percentage: "11.43%",
        },
        "31-45": {
          total: 2,
          percentage: "5.71%",
        },
        "46-60": {
          total: 6,
          percentage: "17.14%",
        },
        "61-75": {
          total: 4,
          percentage: "11.43%",
        },
        "76-90": {
          total: 13,
          percentage: "37.14%",
        },
        "91-105": {
          total: 4,
          percentage: "11.43%",
        },
        "106-120": {
          total: null,
          percentage: null,
        },
      },
      red: {
        "0-15": {
          total: null,
          percentage: null,
        },
        "16-30": {
          total: null,
          percentage: null,
        },
        "31-45": {
          total: null,
          percentage: null,
        },
        "46-30": {
          total: null,
          percentage: null,
        },
        "61-75": {
          total: 1,
          percentage: "100.00%",
        },
        "76-90": {
          total: null,
          percentage: null,
        },
        "91-105": {
          total: null,
          percentage: null,
        },
        "106-120": {
          total: null,
          percentage: null,
        },
      },
    },
  },
};
