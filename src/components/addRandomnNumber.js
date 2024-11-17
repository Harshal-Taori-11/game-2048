export default function addRandomnNumber(grid){
  if (!grid || !Array.isArray(grid)) {
    throw new Error("Invalid grid passed to addRandomNumber");
  }

  const emptyTiles = [];

  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 0) {
        emptyTiles.push({ row: rowIndex, column: colIndex });
      }
    });
  });

  if (emptyTiles.length === 0) {
    return grid;
  }

  const randomnNumberIndex = Math.floor(Math.random() * emptyTiles.length);
  const randomnNumber = Math.random() < 0.5 ? 2 : 4;

  const newGrid = [...grid];
  newGrid[emptyTiles[randomnNumberIndex].row][
    emptyTiles[randomnNumberIndex].column
  ] = randomnNumber;

  return newGrid;
};