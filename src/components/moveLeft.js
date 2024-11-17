import { deepCopy } from "./deepCopy";

export default function moveLeft(grid, score, bestScore) {
  let newGrid = deepCopy(grid);
  let newScore = score;

  newGrid = newGrid.map((row) => {
    const filteredRow = row.filter((value) => value !== 0);

    for(let i=0;i<filteredRow.length-1;i++){
      if(filteredRow[i] === filteredRow[i+1]){
        filteredRow[i] = filteredRow[i]*2;
        filteredRow[i+1] = 0;
        newScore += filteredRow[i];
      }
    }

    const newRow = filteredRow.filter((value) => value !== 0);
 
    while(newRow.length <4){
      newRow.push(0);
    }
    return newRow;
  });

  return {
    grid: newGrid,
    score: newScore,
    bestScore: Math.max(bestScore, newScore),
  };
}
