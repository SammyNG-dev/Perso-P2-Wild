import { Link } from "react-router-dom";
import { useIsOnline } from "../contexts/IsOnlineContext"; // Import du contexte

function Header() {
  const { isOnline } = useIsOnline(); // Récupère le statut en ligne

  return (
    <header>
      <div id="logo">
        <img src="src\assets\images\header.png" alt="logo" />
      </div>
      <nav id="nav">
        <Link to="/games">
          <img id="home" src="src\assets\images\Home.png" alt="Home" />
        </Link>
        <Link to="/favorites">
          <img
            id="favorites"
            src="src\assets\images\Favorites.png"
            alt="Favorites"
          />
        </Link>
        <Link to="">
          <img id="logout" src="src\assets\images\Logout.png" alt="Logout" />
        </Link>
      </nav>
      <div className="status">
        {/* Affichage conditionnel du statut en ligne */}
        {isOnline ? (
          <div id="online-status">
            <img src="src\assets\images\dragon_online.png" alt="dragon_vert" />
            <p>Online</p>
          </div>
        ) : (
          <div id="offline-status">
            <img
              src="src\assets\images\dragon_offline.png"
              alt="dragon_rouge"
            />
            <p>Offline</p>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
