import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [noOfPlayers, setPlayers] = useState("");
  const [isGameOver, setGameOver] = useState(false);

  const restartGame = () => {
    setGameOver(false);
    setPlayers("");
  };
  return (
    <div>
      <div className="game-container">
        {isGameOver && (
          <button className="btn-primary" onClick={restartGame}>
            Click to restart game
          </button>
        )}
      </div>
      <div>
        {noOfPlayers ? (
          <Board
            noOfPlayers={noOfPlayers}
            setGameOver={() => setGameOver(true)}
          />
        ) : (
          <>
            <p>Select number of players:</p>
            <button className="btn-primary" onClick={() => setPlayers(1)}>
              One Player
            </button>
            <button className="btn-primary" onClick={() => setPlayers(2)}>
              Two Players
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
