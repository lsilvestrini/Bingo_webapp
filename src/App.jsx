import React, { useState, useEffect } from "react";
import Bingo from "./Bingo";
import Play from "./Play";
import Gift from "./Gift";
import JumpGame from "./JumpGame";
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("jogar");

  // Bingo state
  const [numbers, setNumbers] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [savedGames, setSavedGames] = useState([]);

  // Play state
  const [card, setCard] = useState([]);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    setNumbers(initialNumbers);
    setDrawnNumbers([]);
    setCurrentNumber(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const restartGame = () => {
    setGameKey((prevKey) => prevKey + 1);
  };
  const generateCard = () => {
    const newCard = [];
    for (let i = 0; i < 5; i++) {
      const column = [];
      for (let j = 0; j < 5; j++) {
        let num;
        do {
          num = Math.floor(Math.random() * 15) + 1 + i * 15;
        } while (column.includes(num));
        column.push(num);
      }
      newCard.push(column);
    }
    newCard[2][2] = "LUCÃO";
    setCard(newCard);
    setMarkedNumbers(["LUCÃO"]);
    setHasWon(false); // Reset win status on new card generation
  };

  const toggleNumber = (num) => {
    if (num === "LUCÃO" || hasWon) return; // Prevent marking if game is won
    if (markedNumbers.includes(num)) {
      setMarkedNumbers(markedNumbers.filter((n) => n !== num));
    } else {
      setMarkedNumbers([...markedNumbers, num]);
    }
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
        <button
          className={`nav-button ${currentPage === "pulinho" ? "active" : ""}`}
          onClick={() => setCurrentPage("pulinho")}
        >
          🎲
        </button>
      </nav>
      {currentPage === "sortear" ? (
        <Bingo
          numbers={numbers}
          setNumbers={setNumbers}
          drawnNumbers={drawnNumbers}
          setDrawnNumbers={setDrawnNumbers}
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
          savedGames={savedGames}
          setSavedGames={setSavedGames}
          onRestart={restartGame}
        />
      ) : currentPage === "jogar" ? (
        <Play
          darkMode={darkMode}
          card={card}
          setCard={setCard}
          markedNumbers={markedNumbers}
          setMarkedNumbers={setMarkedNumbers}
          hasWon={hasWon}
          setHasWon={setHasWon}
          generateCard={generateCard}
        />
      ) : currentPage === "pulinho" ? (
        <JumpGame />
      ) : (
        <Gift />
      )}
    </div>
  );
}

export default App;
