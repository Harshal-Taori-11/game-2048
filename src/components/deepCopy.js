
export function deepCopy(grid) {
    return grid.map((row) => [...row]);
  }