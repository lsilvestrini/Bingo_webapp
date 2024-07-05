import React, { useState, useEffect, useRef } from "react";
import "./JumpGame.css";

const JumpGame = () => {
  const gameAreaRef = useRef(null);
  const characterRef = useRef(null);
  const jumpSoundRef = useRef(null);
  const gameOverSoundRef = useRef(null);

  const [position, setPosition] = useState(0); // Initial position at the bottom
  const [velocity, setVelocity] = useState(0);
  const [jumps, setJumps] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [objectsJumped, setObjectsJumped] = useState(0);
  const [distanceSkated, setDistanceSkated] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const gravity = -0.4; // Reduced gravity to make falling slower
  const jumpStrength = 12; // Increased jump strength to make jumping higher
  const maxJumps = 3;
  const obstacleSpeed = 5; // Slower obstacle speed
  const obstacleFrequency = 0.01; // Reduced obstacle generation frequency
  const obstacleMinSpacing = 20; // Minimum space between obstacles

  const handleJump = (e) => {
    if (
      (e.code === "Space" || e.type === "click") &&
      isGameStarted &&
      !isGameOver
    ) {
      if (jumps < maxJumps) {
        setVelocity(jumpStrength); // Positive velocity to jump upwards
        setJumps((prevJumps) => prevJumps + 1);
        jumpSoundRef.current.play();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleJump);
    window.addEventListener("click", handleJump);

    return () => {
      window.removeEventListener("keydown", handleJump);
      window.removeEventListener("click", handleJump);
    };
  }, [jumps, isGameStarted, isGameOver]);

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    const gameLoop = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + velocity;
        const gameHeight = gameAreaRef.current.clientHeight;

        if (newPosition < 0) {
          setVelocity(0);
          setJumps(0); // Reset jumps when hitting the ground
          return 0;
        }

        if (newPosition >= gameHeight - 70) {
          setVelocity(gravity); // Make sure the character falls back down
          return gameHeight - 70;
        }

        return newPosition;
      });

      setVelocity((prevVelocity) => prevVelocity + gravity);

      setObstacles((prevObstacles) =>
        prevObstacles
          .map((obstacle) => ({
            ...obstacle,
            left: obstacle.left - obstacleSpeed,
          }))
          .filter((obstacle) => {
            if (obstacle.left < 0 && !obstacle.passed) {
              setObjectsJumped((prevObjectsJumped) => prevObjectsJumped + 1);
              obstacle.passed = true;
            }
            return obstacle.left > -50;
          }),
      );

      if (Math.random() < obstacleFrequency) {
        const lastObstacle = obstacles[obstacles.length - 1];
        const lastObstacleRight = lastObstacle ? lastObstacle.left + 50 : 0;
        const gameWidth = gameAreaRef.current.clientWidth;

        if (lastObstacleRight < gameWidth - obstacleMinSpacing) {
          const obstacleType = Math.floor(Math.random() * 3) + 1;
          setObstacles((prevObstacles) => [
            ...prevObstacles,
            {
              id: Date.now(),
              left: gameWidth,
              bottom: 5,
              height: Math.random() * 50 + 50,
              type: obstacleType,
              passed: false,
            },
          ]);
        }
      }

      setDistanceSkated((prevDistanceSkated) => prevDistanceSkated + 1);
    }, 20);

    return () => clearInterval(gameLoop);
  }, [velocity, isGameStarted, isGameOver, obstacles]);

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    const checkCollision = () => {
      const charRect = characterRef.current.getBoundingClientRect();
      const margin = 20; // Adjust this value for tighter hitboxes
      obstacles.forEach((obstacle) => {
        const obRect = document
          .getElementById(obstacle.id)
          ?.getBoundingClientRect();
        if (
          obRect &&
          charRect.left + margin < obRect.left + obRect.width &&
          charRect.left + charRect.width - margin > obRect.left &&
          charRect.top + margin < obRect.top + obRect.height &&
          charRect.top + charRect.height - margin > obRect.top
        ) {
          gameOverSoundRef.current.play();
          setIsGameOver(true);
        }
      });
    };

    const collisionLoop = setInterval(checkCollision, 20);

    return () => clearInterval(collisionLoop);
  }, [obstacles, isGameStarted, isGameOver]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setPosition(0); // Set position at the bottom when game starts
    setVelocity(0);
    setJumps(0);
    setObstacles([]);
    setObjectsJumped(0);
    setDistanceSkated(0);
  };

  return (
    <div className="game-area-container">
      <div className="game-area" ref={gameAreaRef}>
        {isGameOver && (
          <div className="game-over-screen">
            <h1>Game Over!</h1>
            <p>Your score: {objectsJumped}</p>
            <p>Alcançou: {distanceSkated} meters</p>
            <button className="start-button" onClick={startGame}>
              Restart
            </button>
          </div>
        )}
        {!isGameStarted && !isGameOver && (
          <div className="start-screen">
            <h1>Skatin de dedo virtual 🛹</h1>
            <p></p>
            <button className="start-button" onClick={startGame}>
              Começar
            </button>
          </div>
        )}
        {isGameStarted && !isGameOver && (
          <>
            <div
              className="character"
              ref={characterRef}
              style={{ bottom: position + "px" }}
            ></div>
            {obstacles.map((obstacle) => (
              <div
                key={obstacle.id}
                id={obstacle.id}
                className={`obstacle obstacle-${obstacle.type}`}
                style={{
                  left: obstacle.left + "px",
                  bottom: "0",
                  height: obstacle.height + "px",
                }}
              ></div>
            ))}
            <div className="score">Pontuação: {objectsJumped}</div>
            <div className="distance">Alcançou: {distanceSkated} metros</div>
          </>
        )}
        <audio ref={jumpSoundRef} src="./jump_skate.mp3" />
        <audio ref={gameOverSoundRef} src="./end1.mp3" />
      </div>
    </div>
  );
};

export default JumpGame;
