import clickSound from "/src/assets/chocobo_wark.mp3";
import { useFavoritesGames } from "../contexts/FavoritesGamesContext";

interface GameProps {
  game: {
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
  };
}

const CardGame = ({ game }: GameProps) => {
  const { favoritesGames, setFavoritesGames } = useFavoritesGames();

  const playSound = () => {
    // Crée une nouvelle instance Audio
    const audio = new Audio(clickSound);
    audio.play(); // Joue le son
  };

  return (
    <div className="card-game">
      <div id="game-info">
        <h3>{game.title}</h3>
        <img
          id="game-img"
          src={game.thumbnail}
          alt={`Thumbnail of ${game.title}`}
          width="150"
        />
        <p>{game.short_description}</p>
        <p>Platform: {game.platform}</p>
        <p>Publisher: {game.publisher}</p>
        <p>
          <a href={game.game_url} target="_blank" rel="noopener noreferrer">
            Game url
          </a>
        </p>
      </div>
      <div id="buttons-bar">
        <button
          id="remove-button"
          type="button"
          onClick={() => {
            playSound();
            //Supprime le jeu sélectionné de la liste des favoris
            setFavoritesGames(favoritesGames.filter((id) => id !== game.id));
          }}
        >
          <div>
            <img src="src\assets\images\Unlike.png" alt="Unlike" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CardGame;
