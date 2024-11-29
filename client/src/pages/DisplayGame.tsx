import { useState } from "react";
import clickSound from "/src/assets/chocobo_wark.mp3"; // Import du fichier audio
import { useFavoritesGames } from "../contexts/FavoritesGamesContext";
import { useGames } from "../contexts/GamesContext";

const DisplayGame = ({ selectedGameId }: { selectedGameId: number }) => {
  const { games, setSelectedGameId } = useGames();
  const displayedGame = games.find((game) => game.id === selectedGameId);
  const { favoritesGames, setFavoritesGames } = useFavoritesGames();

  const [toggleFavorite, setToggleFavorite] = useState(false);

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  function toggle() {
    playSound(); // Joue le son lorsque le bouton est cliqué
    if (toggleFavorite === false) {
      setToggleFavorite(true);
      setFavoritesGames([...favoritesGames, selectedGameId]);
    } else {
      setToggleFavorite(false);
      setFavoritesGames(favoritesGames.filter((id) => id !== selectedGameId));
    }
  }

  if (!displayedGame) {
    return <p>Game not found</p>;
  }

  return (
    <div className="display-game">
      <button id="return" type="button" onClick={() => setSelectedGameId(null)}>
        <img src="src\assets\images\Retour.png" alt="Return" />
      </button>
      <div className="game-details">
        <h2>{displayedGame.title}</h2>
        <img
          src={displayedGame.thumbnail}
          alt={`Thumbnail of ${displayedGame.title}`}
          width="300"
        />
        <p>{displayedGame.short_description}</p>
        <ul>
          <li>
            <strong>Genre :</strong> {displayedGame.genre}
          </li>
          <li>
            <strong>Plateform :</strong> {displayedGame.platform}
          </li>
          <li>
            <strong>Publisher :</strong> {displayedGame.publisher}
          </li>
          <li>
            <strong>Developer :</strong> {displayedGame.developer}
          </li>
          <li>
            <strong>Release date :</strong> {displayedGame.release_date}
          </li>
        </ul>
        <p>
          <a
            href={displayedGame.game_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Game url
          </a>
          <button id="like-button" type="button" onClick={toggle}>
            {toggleFavorite ? "🧡" : "🤍"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default DisplayGame;
