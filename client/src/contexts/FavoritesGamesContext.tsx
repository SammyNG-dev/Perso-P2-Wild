import { createContext, useContext, useState } from "react";

interface FavoritesGamesContextValue {
  favoritesGames: number[];
  setFavoritesGames: React.Dispatch<React.SetStateAction<number[]>>;
}

const FavoritesGamesContext = createContext<FavoritesGamesContextValue | null>(
  null,
);

export function FavoritesGamesProvider({
  children,
}: { children: React.ReactNode }) {
  const [favoritesGames, setFavoritesGames] = useState<number[]>([]);
  return (
    <FavoritesGamesContext.Provider
      value={{ favoritesGames, setFavoritesGames }}
    >
      {children}
    </FavoritesGamesContext.Provider>
  );
}

export const useFavoritesGames = () => {
  const value = useContext(FavoritesGamesContext);
  if (value === null) {
    throw new Error(
      "useFavoritesGames had to be used within a <FavoritesGamesProvider>",
    );
  }
  return value;
};
