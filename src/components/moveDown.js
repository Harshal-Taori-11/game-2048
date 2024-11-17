import moveRight from "./moveRight";
import transposeGrid from "./transposeGrid";

export default function moveLeft(grid, score, bestScore) {
    
    let transposeG = transposeGrid(grid);

    let resultOfMove = moveRight(transposeG , score ,bestScore);


  return {
    grid: transposeGrid(resultOfMove.grid),
    score: resultOfMove.score,
    bestScore: resultOfMove.bestScore,
  };
}