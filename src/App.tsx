import "./App.css";
import { Game } from "./companents/game/Game";
import { useState } from "react";
import StartGame from "./companents/startGame/StartGame";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  return (
    <div className="game">
      {!isGameStarted && <StartGame onStart={setIsGameStarted as () => void} />}
      {isGameStarted && <Game />}
    </div>
  );
}

export default App;
