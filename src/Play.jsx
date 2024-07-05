import React, { useEffect } from "react";
import "./Play.css";
import JumpGame from "./JumpGame";

function Play({
  darkMode,
  card,
  setCard,
  markedNumbers,
  setMarkedNumbers,
  hasWon,
  setHasWon,
  generateCard,
}) {
  useEffect(() => {
    if (card.length === 0) {
      generateCard();
    }
  }, []);

  useEffect(() => {
    if (card.length > 0) {
      checkWin();
    }
  }, [markedNumbers]);

  const toggleNumber = (num) => {
    if (num === "LUCÃO" || hasWon) return;
    if (markedNumbers.includes(num)) {
      setMarkedNumbers(markedNumbers.filter((n) => n !== num));
    } else {
      setMarkedNumbers([...markedNumbers, num]);
    }
  };

  const checkWin = () => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (card[i].every((num) => markedNumbers.includes(num))) {
        setHasWon(true);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
      if (card.every((row) => markedNumbers.includes(row[i]))) {
        setHasWon(true);
        return;
      }
    }

    // Check diagonals
    if (
      card.every((row, index) => markedNumbers.includes(row[index])) ||
      card.every((row, index) => markedNumbers.includes(row[4 - index]))
    ) {
      setHasWon(true);
      return;
    }
  };

  return (
    <div className={`play-container ${darkMode ? "dark-mode" : ""}`}>
      <h1>Bingo dos amigs ❤️</h1>
      <div className={`bingo-card ${hasWon ? "win-animation" : ""}`}>
        {["B", "I", "N", "G", "O"].map((letter, i) => (
          <div key={letter} className="bingo-column">
            <div className="column-header">{letter}</div>
            {card[i]?.map((num, j) => (
              <div
                key={j}
                className={`bingo-number ${
                  markedNumbers.includes(num) ? "marked" : ""
                } ${num === "LUCÃO" ? "lucao" : ""}`}
                onClick={() => toggleNumber(num)}
                title={`Clique para marcar o número ${num}`}
              >
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
      {hasWon && (
        <div className="win-message">
          Parabéns! Você ganhou um:
          <br />
          Abraço do Lucão!
        </div>
      )}
      <div className="info-container">
        <p>Números marcados: {markedNumbers.length}</p>
        <p>Números restantes: {25 - markedNumbers.length}</p>
      </div>
      <button
        onClick={generateCard}
        className="new-card-button"
        title="Gerar nova cartela de bingo"
      >
        Gerar Nova Cartela ♻️
      </button>
    </div>
  );
}

export default Play;
