import "./components/DisplayGames.css";
import "./components/DisplayGame.css";
import "./App.css";
import "./components/header.css";
import "./components/CardGame.css";
import "./components/Footer.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { FavoritesGamesProvider } from "./contexts/FavoritesGamesContext";
import { GamesProvider } from "./contexts/GamesContext";
import { IsOnlineProvider } from "./contexts/IsOnlineContext";
function App() {
  return (
    <IsOnlineProvider>
      <FavoritesGamesProvider>
        <GamesProvider>
          <div>
            <header>
              <Header />
            </header>
            <main>
              <Outlet />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </GamesProvider>
      </FavoritesGamesProvider>
    </IsOnlineProvider>
  );
}
export default App;
