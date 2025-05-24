function FindFullRows(grid) {
  var fullRows = [];
  for (var i = 0; i < 16; i++) {
    var full = true;
    for (var j = 0; j < 10; j++) {
      var index = i * 10 + j;
      if (!grid[index].style.backgroundColor) {
        full = false;
        break;
      }
    }
    if (full) {
      fullRows.push(i);
    }
  }
  return fullRows;
}
function checkGrid() {
  const grid = document.querySelectorAll("#table td");
  var full = FindFullRows(grid);
  for (var i = 0; i < full.length; i++) {
    for (var j = 0; j < 10; j++) {
      grid[full[i] * 10 + j].style.backgroundColor = "";
    }
    for (var r = full[i] - 1; r >= 0; r--) {
      for (var j = 0; j < 10; j++) {
        grid[(r + 1) * 10 + j].style.backgroundColor =
          grid[r * 10 + j].style.backgroundColor;
        grid[r * 10 + j].style.backgroundColor = "";
      }
    }
  }
  return full.length;
}
function checkLosing(currentTetCells) {
  const grid = document.querySelectorAll("#table td");
  if (currentTetCells[0] > 10) return true;
  for (var i = 0; i < currentTetCells.length; i++) {
    if (
      grid[currentTetCells[i]].style.backgroundColor !== "" &&
      currentTetCells[i] < 10
    ) {
      return true;
    }
  }
  return false;
}
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
