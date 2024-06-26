import React, { useState } from "react";
import Bingo from "./Bingo";
import Play from "./Play";
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [currentPage, setCurrentPage] = useState("jogar");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const restartGame = () => {
    setGameKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>
      <nav className="navigation">
        <button
          className={`nav-button ${currentPage === "jogar" ? "active" : ""}`}
          onClick={() => setCurrentPage("jogar")}
        >
          Jogar
        </button>
        <button
          className={`nav-button ${currentPage === "sortear" ? "active" : ""}`}
          onClick={() => setCurrentPage("sortear")}
        >
          Sortear
        </button>
      </nav>
      {currentPage === "sortear" ? (
        <Bingo key={gameKey} onRestart={restartGame} />
      ) : (
        <Play key={gameKey} darkMode={darkMode} />
      )}
    </div>
  );
}

export default App;
