

const checkGameOver = (grid) =>{
    
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j] == 0){
                return false;
            }
            if((i < 3 && grid[i][j] === grid[i+1][j] ||
                j < 3 && grid[i][j] === grid[i][j+1] )){
                    return false;
                }
        }
    }

    return true;

}

export default checkGameOver;