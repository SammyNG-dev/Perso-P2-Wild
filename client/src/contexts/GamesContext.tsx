import { createContext, useContext, useEffect, useState } from "react";

// Define the Game interface (excluding selectedGameId)
interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  profile_url: string;
}

interface GamesContextType {
  games: Game[];
  selectedGameId: number | null;
  setSelectedGameId: (id: number | null) => void;
  isLoading: boolean;
  error: string | null;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGames must be used within a GamesProvider");
  }
  return context;
};

export const GamesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.mmobomb.com/api1/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc",
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGames(data as Game[]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
        setError("Failed to load games.");
        setIsLoading(false);
      });
  }, []);

  return (
    <GamesContext.Provider
      value={{
        games,
        selectedGameId,
        setSelectedGameId,
        isLoading,
        error,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
