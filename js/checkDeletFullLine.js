function FindFullRows(grid){
    var fullRows = [];
    for (var i= 0; i< 16; i++) {
        var full = true;
        for (var j= 0; j< 10; j++) {
            var index = i* 10 + j;
            if (!grid[index].style.backgroundColor) {
                full = false;
                break;
            }
        }
        if (full) {
            fullRows.push(i);
        }
    }
    return fullRows
}
function checkGrid() {
    const grid = document.querySelectorAll("#table td")
    var full = FindFullRows(grid)
    for (var i = 0; i < full.length; i++) {
        for (var j= 0; j< 10; j++) {
            grid[full[i]*10+j].style.backgroundColor = ""
        }
        for (var r=full[i]-1;r>=0;r--) {
            for (var j= 0; j<10; j++) {
                grid[(r+1)*10+j].style.backgroundColor = grid[r*10+j].style.backgroundColor;
                grid[r*10+j].style.backgroundColor = ""
            }
        }
    }
    return full.length
}
function checkLosing(curentTetCells){
    const grid = document.querySelectorAll("#table td")
    var edgeTop = curentTetCells[0]
    var edgeBottom = curentTetCells[3]
    if(grid[edgeBottom+10].style.backgroundColor!==""&&edgeTop<10){
        return true
    }
    return false

    
    
}