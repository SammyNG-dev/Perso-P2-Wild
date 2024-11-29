import CardGame from "../components/CardGame";
import { useFavoritesGames } from "../contexts/FavoritesGamesContext";
import { useGames } from "../contexts/GamesContext";

function FavoritesList() {
  const { favoritesGames } = useFavoritesGames();
  const { games } = useGames();

  // si l'id n'est pas dans le tableau il est ajouté.
  function withoutDuplicate() {
    const result: number[] = [];
    for (const item of favoritesGames) {
      if (!result.includes(item)) {
        result.push(item);
      }
    }
    return result;
  }

  const favoritesGamesWithoutDuplicate = withoutDuplicate();

  return (
    <>
      {favoritesGamesWithoutDuplicate.map((favoriteGameId) => {
        const game = games.find((g) => g.id === favoriteGameId);
        return game ? <CardGame key={favoriteGameId} game={game} /> : null;
      })}
    </>
  );
}

export default FavoritesList;
