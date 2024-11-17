
export default function transposeGrid(grid){
    let transposeGrid=[];

    for(let i=0;i<grid.length;i++){
        transposeGrid.push([]);
        for(let j=0;j<grid[i].length;j++){
            transposeGrid[i][j] = grid[j][i]; 
        }
    }

    return transposeGrid;
}