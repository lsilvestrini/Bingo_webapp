import React, { useState } from "react";
import "./Bingo.css";

function Bingo({
  numbers,
  setNumbers,
  drawnNumbers,
  setDrawnNumbers,
  currentNumber,
  setCurrentNumber,
  savedGames,
  setSavedGames,
  onRestart,
}) {
  const [winnerName, setWinnerName] = useState("");
  const [showWinnerInput, setShowWinnerInput] = useState(false);

  const drawNumber = () => {
    if (numbers.length > 0) {
      const index = Math.floor(Math.random() * numbers.length);
      const drawn = numbers[index];
      setCurrentNumber(drawn);
      const newDrawnNumbers = [...drawnNumbers, drawn];
      setDrawnNumbers(newDrawnNumbers);
      setNumbers(numbers.filter((n) => n !== drawn));
    }
  };

  const saveAndRestart = () => {
    setShowWinnerInput(true);
  };

  const handleWinnerSave = () => {
    if (drawnNumbers.length > 0 && winnerName) {
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const gameName = `Jogo ${savedGames.length + 1} - Vencedor: ${winnerName} - ${formattedDate}`;
      setSavedGames([
        ...savedGames,
        { name: gameName, numbers: [...drawnNumbers] },
      ]);
      setWinnerName("");
      setShowWinnerInput(false);
      setDrawnNumbers([]);
      setCurrentNumber(null);
      onRestart();
    }
  };

  return (
    <div className="bingo-container">
      <h1 className="bingo-title">Bingo dos amigs ❤️</h1>
      <div className="current-number-container">
        <p className="current-number-label">Número Atual</p>
        <div className="current-number">{currentNumber || "-"}</div>
      </div>
      <div className="button-container">
        <button className="draw-button" onClick={drawNumber}>
          Sortear Número
        </button>
        <button className="restart-button" onClick={saveAndRestart}>
          Salvar Jogo
        </button>
      </div>
      {showWinnerInput && (
        <div className="winner-input-container">
          <label htmlFor="winnerName">Vencedor : </label>
          <input
            type="text"
            id="winnerName"
            value={winnerName}
            onChange={(e) => setWinnerName(e.target.value)}
            placeholder="❤️ Nome vencedor"
          />
          <button onClick={handleWinnerSave} className="save-button">
            Salvar
          </button>
        </div>
      )}
      <div className="drawn-numbers-container">
        <h2 className="drawn-numbers-title">Números Sorteados</h2>
        <div className="drawn-numbers-grid">
          {drawnNumbers.map((num) => (
            <div key={num} className="drawn-number">
              {num}
            </div>
          ))}
        </div>
      </div>
      {savedGames.length > 0 && (
        <div className="saved-games-container">
          <h2 className="saved-games-title">Jogos Anteriores</h2>
          {savedGames.map((game, index) => (
            <div key={index} className="saved-game">
              <h3>{game.name}</h3>
              <p>Números: {game.numbers.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bingo;
