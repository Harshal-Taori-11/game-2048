import {deepCopy} from './deepCopy';

export default function moveRight(grid, score, bestScore) {
    // Create a deep copy of the grid to avoid mutation
    let newGrid = deepCopy(grid);
    let newScore = score;

    // Process each row
    newGrid = newGrid.map((row) => {
        let reversedRow = [...row].reverse(); // Reverse the row for right-to-left processing
        let filteredRow = reversedRow.filter((value) => value !== 0); // Remove zeroes
        let newRow = [];

        // Merge tiles
        for (let i = 0; i < filteredRow.length; i++) {
            if (filteredRow[i] === filteredRow[i + 1]) {
                newRow.push(filteredRow[i] * 2); // Merge the tiles
                newScore += filteredRow[i] * 2; // Update the score
                i++; // Skip the next tile
            } else {
                newRow.push(filteredRow[i]);
            }
        }

        // Add trailing zeroes to fill the row
        while (newRow.length < 4) {
            newRow.push(0);
        }

        // Reverse back to restore original direction
        return newRow.reverse();
    });

    // Return the updated state
    return {
        grid: newGrid,
        score: newScore,
        bestScore: Math.max(bestScore, newScore),
    };
}