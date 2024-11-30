import { useState } from "react";
import { useGames } from "../contexts/GamesContext";
import DisplayGame from "./DisplayGame";

const DisplayGames = () => {
  const { games, selectedGameId, setSelectedGameId, isLoading, error } =
    useGames();
  const [displayedGames, setDisplayedGames] = useState(games)


  if (isLoading) {
    return <p>Loading games...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  // Si un jeu est sélectionné, afficher le composant DisplayGame
  if (selectedGameId !== null) {
    return <DisplayGame selectedGameId={selectedGameId} />;
  }

  // Fonction pour gérer le clic et la sélection au clavier
  const handleSelection = (gameId: number) => {
    setSelectedGameId(gameId);
  };

  const alphabet = "abdefghijklmnopqrstuvwxyz#"
  .toUpperCase()
  .split("")
  
  function handleClickLetter(l: string){ // l est la lettre sélectionnée
    if(l !== "#"){
      setDisplayedGames(games.filter((game)=>game.title[0].toUpperCase() === l.toUpperCase()))
    } else {
      setDisplayedGames(games)
    }
  }


  return (
    <div className="mainCard">
      <h1 className="libre-baskerville-regular">List of games</h1>
      <div id="alphabet">
        {alphabet.map((letter)=>{
          return (
            <button
            className="letter-button"
            key={letter}
            type="button"
            onClick={()=>handleClickLetter(letter)}>
              {letter}
            </button>
          )
        })}
      </div>
      <div className="games-list">
        {displayedGames.map((game) => (
          <div
            key={game.id}
            className="game-card"
            onClick={() => handleSelection(game.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleSelection(game.id);
              }
            }}
          >
            <img
              src={game.thumbnail}
              alt={`Thumbnail of ${game.title}`}
              width="150"
            />
            <h3>{game.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayGames;
