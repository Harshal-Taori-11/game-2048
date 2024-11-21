import './styles/App.css'

import { useState, useEffect, useCallback } from "react";
import { deepCopy } from "./components/deepCopy.js";
import addRandomnNumber from "./components/addRandomnNumber.js";
import moveDown from './components/moveDown.js';
import moveUp from './components/moveUp.js';
import moveLeft from './components/moveLeft.js';
import moveRight from './components/moveRight.js';
import checkGameOver from './components/checkGameOver.js';


function App() {

  const initialGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const [isDirectionLocked, setIsDirectionLocked] = useState(false);
  const [grid, setgrid] = useState(initialGrid);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(parseInt(localStorage.getItem("bestScore")) || 0);

  const changeDirectionThreshold = 10;

  const nextProcess = (result) => {
    if (JSON.stringify(grid) !== JSON.stringify(result.grid)) {
      const newGrid = addRandomnNumber(result.grid);
      setgrid(result.grid);
      setScore(result.score);
      setBestScore(result.bestScore);

      if (checkGameOver(newGrid)) {
        alert(" GAME OVER! ");
        setgrid(initialGrid);
      }
    }
  }

  const handleTouchStart = (e) => {

    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setLastMove(null);
    setIsDirectionLocked(false);
  };

  const handleTouchMove = (e) => {
    if (isDirectionLocked) {
      return;
    }

    let result = { grid: grid, score: score, bestScore: bestScore };

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const diffX = currentX - startX;
    const diffY = currentY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {

      // for horizontal movement 
      if (Math.abs(diffX) > changeDirectionThreshold && lastMove !== 'horizontal') {
        setIsDirectionLocked(true);
        if (diffX > 0) { // right movement
          result = moveRight(grid, score, bestScore);
        }
        else {
          result = moveLeft(grid, score, bestScore);
        }
      }
    } else {

      // for vertical movement
      if (Math.abs(diffY) > changeDirectionThreshold && lastMove !== 'vertical') {
        setIsDirectionLocked(true);
        if (diffY > 0) {  //down movement
          result = moveDown(grid, score, bestScore);
        }
        else {
          result = moveUp(grid, score, bestScore);
        }
      }
    }
    nextProcess(result);
  }


  const handleTouchEnd = (e) => {
    setIsDirectionLocked(false);
  };

  const handleKeyDown = useCallback((e) => {
    let result = { grid: grid, score: score, bestScore: bestScore };
    if (e.key === "ArrowLeft") {
      result = moveLeft(grid, score, bestScore);
    }
    else if (e.key === "ArrowRight") {
      result = moveRight(grid, score, bestScore);
    }
    else if (e.key === "ArrowUp") {
      result = moveUp(grid, score, bestScore);
    }
    else if (e.key === "ArrowDown") {
      result = moveDown(grid, score, bestScore);
    }

    nextProcess(result);
  },
    [grid, score, bestScore]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown]);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore);
  }, [bestScore]);

  const startGame = () => {
    let newGameGrid = deepCopy(initialGrid);
    const gameGrid = addRandomnNumber(addRandomnNumber(newGameGrid));;
    setgrid(gameGrid);
    setScore(0);
  }

  return (
    <div onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <h1>2048 Game</h1>

      <div className="Score-Board">
        <p>Score : {score}</p>
        <p>Best Score : {bestScore}</p>
      </div>

      <div className="Game-Board">
        {grid.flatMap((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={`tile tile-${tile}`}>
              {tile !== 0 && tile}
            </div>
          ))
        )}
      </div>

      <div>
        <button className="btn" onClick={startGame}>Start Game</button>
      </div>


    </div>
  )
}

export default App
