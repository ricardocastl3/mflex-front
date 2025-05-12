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
