import moveLeft from './moveLeft';
import transposeGrid from './transposeGrid';

const moveUp = (grid, score , bestScore) =>{

    let transposeG = transposeGrid(grid);

    let resultOfMove = moveLeft(transposeG,score,bestScore);

    return {
        grid: transposeGrid(resultOfMove.grid),
        score : resultOfMove.score,
        bestScore : resultOfMove.bestScore,
    }
}

export default moveUp;