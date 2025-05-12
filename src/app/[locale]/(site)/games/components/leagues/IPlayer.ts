interface IFootballPlayerFullStats {
  team: {
    id: number;
    name: string;
    logo: string;
    update: string;
  };
  players: IFootballPlayer[];
}

interface IFootballPlayer {
  player: {
    id: number;
    name: string;
    photo: string;
  };
  statistics: IFootballPlayerStats[];
}

interface IFootballPlayerStats {
  games: {
    minutes: number;
    number: number;
    position: string;
    rating: string;
    captain: boolean;
    substitute: boolean;
  };
  offsides: number | null;
  shots: {
    total: number | null;
    on: number | null;
  };
  goals: {
    total: number | null;
    conceded: number;
    assists: number;
    saves: number;
  };
  passes: {
    total: number;
    key: number | null;
    accuracy: string;
  };
  tackles: {
    total: number | null;
    blocks: number | null;
    interceptions: number | null;
  };
  duels: {
    total: number | null;
    won: number | null;
  };
  dribbles: {
    attempts: number | null;
    success: number | null;
    past: number | null;
  };
  fouls: {
    drawn: number | null;
    committed: number | null;
  };
  cards: {
    yellow: number;
    red: number;
  };
  penalty: {
    won: number | null;
    commited: number | null;
    scored: number;
    missed: number;
    saved: number;
  };
}

export type { IFootballPlayerFullStats as PlayerStatistics };

export const examplePlayerStatistics: IFootballPlayerFullStats = {
  team: {
    id: 3002,
    name: "Seattle Reign FC",
    logo: "https://media.api-sports.io/football/teams/3002.png",
    update: "2025-05-12T11:30:12+00:00",
  },
  players: [
    {
      player: {
        id: 361685,
        name: "Claudia Dickey",
        photo: "https://media.api-sports.io/football/players/361685.png",
      },
      statistics: [
        {
          games: {
            minutes: 90,
            number: 1,
            position: "G",
            rating: "6.2",
            captain: false,
            substitute: false,
          },
          offsides: null,
          shots: {
            total: null,
            on: null,
          },
          goals: {
            total: null,
            conceded: 1,
            assists: 0,
            saves: 1,
          },
          passes: {
            total: 40,
            key: null,
            accuracy: "27",
          },
          tackles: {
            total: null,
            blocks: null,
            interceptions: null,
          },
          duels: {
            total: null,
            won: null,
          },
          dribbles: {
            attempts: null,
            success: null,
            past: null,
          },
          fouls: {
            drawn: null,
            committed: null,
          },
          cards: {
            yellow: 0,
            red: 0,
          },
          penalty: {
            won: null,
            commited: null,
            scored: 0,
            missed: 0,
            saved: 0,
          },
        },
      ],
    },
  ],
};
