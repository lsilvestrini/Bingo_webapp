import React, { useState, useEffect, useCallback } from "react";
import "./MarioMiniGame.css";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const MARIO_WIDTH = 50;
const MARIO_HEIGHT = 50;

const MarioMiniGame = () => {
  const [marioPosition, setMarioPosition] = useState({
    x: 50,
    y: GAME_HEIGHT - MARIO_HEIGHT,
  });
  const [marioVelocity, setMarioVelocity] = useState({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const jump = useCallback(() => {
    if (marioPosition.y === GAME_HEIGHT - MARIO_HEIGHT) {
      setMarioVelocity((prev) => ({ ...prev, y: JUMP_FORCE }));
    }
  }, [marioPosition.y]);

  const moveHorizontal = useCallback((direction) => {
    setMarioVelocity((prev) => ({ ...prev, x: direction * 5 }));
  }, []);

  const stopHorizontal = useCallback(() => {
    setMarioVelocity((prev) => ({ ...prev, x: 0 }));
  }, []);

  const updateGameState = useCallback(() => {
    if (gameOver) return;

    // Update Mario's position
    setMarioPosition((prev) => ({
      x: Math.max(
        0,
        Math.min(GAME_WIDTH - MARIO_WIDTH, prev.x + marioVelocity.x),
      ),
      y: Math.min(GAME_HEIGHT - MARIO_HEIGHT, prev.y + marioVelocity.y),
    }));

    // Apply gravity
    setMarioVelocity((prev) => ({ ...prev, y: prev.y + GRAVITY }));

    // Generate obstacles
    if (Math.random() < 0.02) {
      setObstacles((prev) => [
        ...prev,
        { x: GAME_WIDTH, y: GAME_HEIGHT - 50, width: 30, height: 50 },
      ]);
    }

    // Move obstacles
    setObstacles((prev) =>
      prev
        .map((obs) => ({ ...obs, x: obs.x - 5 }))
        .filter((obs) => obs.x > -obs.width),
    );

    // Check collisions
    obstacles.forEach((obs) => {
      if (
        marioPosition.x < obs.x + obs.width &&
        marioPosition.x + MARIO_WIDTH > obs.x &&
        marioPosition.y < obs.y + obs.height &&
        marioPosition.y + MARIO_HEIGHT > obs.y
      ) {
        setGameOver(true);
      }
    });

    // Update score
    setScore((prev) => prev + 1);
  }, [gameOver, marioPosition, marioVelocity, obstacles]);

  useEffect(() => {
    const gameLoop = setInterval(updateGameState, 1000 / 60);
    return () => clearInterval(gameLoop);
  }, [updateGameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case " ":
        case "ArrowUp":
          jump();
          break;
        case "ArrowLeft":
          moveHorizontal(-1);
          break;
        case "ArrowRight":
          moveHorizontal(1);
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowRight":
          stopHorizontal();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [jump, moveHorizontal, stopHorizontal]);

  return (
    <div className="mario-game-container">
      <div
        className="mario-game"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        <div
          className="mario"
          style={{
            left: marioPosition.x,
            bottom: GAME_HEIGHT - marioPosition.y - MARIO_HEIGHT,
          }}
        />
        {obstacles.map((obs, index) => (
          <div
            key={index}
            className="obstacle"
            style={{
              left: obs.x,
              bottom: 0,
              width: obs.width,
              height: obs.height,
            }}
          />
        ))}
      </div>
      <div className="mario-game-info">
        <p>Score: {score}</p>
        {gameOver && <p>Game Over!</p>}
      </div>
    </div>
  );
};

export default MarioMiniGame;
