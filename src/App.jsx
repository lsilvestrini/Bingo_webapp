import React, { useState, useEffect } from "react";
import Bingo from "./Bingo";
import Play from "./Play";
import Gift from "./Gift";
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [currentPage, setCurrentPage] = useState("jogar");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const restartGame = () => {
    setGameKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "🌙" : "☀️"}
      </button>
      <nav className="navigation">
        <button
          className={`nav-button ${currentPage === "jogar" ? "active" : ""}`}
          onClick={() => setCurrentPage("jogar")}
        >
          Jogar
        </button>
        <button
          className={`nav-button ${
            currentPage === "presentear" ? "active" : ""
          }`}
          onClick={() => setCurrentPage("presentear")}
        >
          Presentear
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
      ) : currentPage === "jogar" ? (
        <Play key={gameKey} darkMode={darkMode} />
      ) : (
        <Gift />
      )}
    </div>
  );
}

export default App;
