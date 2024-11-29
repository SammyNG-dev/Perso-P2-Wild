import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";
import successSound from "/src/assets/final-fantasy-vii-victory-fanfare-1.mp3"; // Import du fichier audio
import vnpp_gandalf from "/src/assets/vnpp_gandalf.mp3";

const usersData = [
  { username: "Samy", password: "Samy123" },
  { username: "Eric", password: "Eric123" },
  { username: "Seb", password: "Seb123" },
  { username: "Sims", password: "Sims123" },
];

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fonction de validation des identifiants
  const validateCredentials = (username: string, password: string): boolean => {
    // Vérifie si le nom d'utilisateur et le mot de passe correspondent à un utilisateur dans les données simulées deux paramètres obligatoires
    return usersData.some(
      (user) => user.username === username && user.password === password,
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username && password) {
      if (validateCredentials(username, password)) {
        const audio = new Audio(successSound); // Crée une nouvelle instance Audio
        audio.play(); // Joue le son
        setIsOnline(!isOnline);
        alert("Connection successfull !");
        navigate("/games");
      } else {
        const gandalf = new Audio(vnpp_gandalf);
        gandalf.play();
        alert("Incorrect username or password");
      }
    } else {
      alert("Please complete all fields");
    }
  };

  return (
    <div className="div-form">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} className="form">
        <h2>Username</h2>
        <input
          type="text"
          className="username"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <h2>Password</h2>
        <input
          type="password"
          className="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button-login" type="submit">
          <img
            className="login-logo"
            src="src/assets/images/login.png"
            alt="Logo de connexion"
          />
        </button>
      </form>

      <div className="status">
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
    </div>
  );
}

export default Login;
