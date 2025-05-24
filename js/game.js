var tetrominos = [
  {
    name: "carry",
    cells: [5, 6, 15, 16],
    prevPlace: [],
    moveLeft: moveLeft,
    cellsLeftToCheck: [0, 2],
    moveRight: moveRight,
    cellsRightToCheck: [1, 3],
    moveDown: moveDown,
    cellsDownToCheck: [2, 3],
    color: "",
  },
  {
    name: "line",
    cells: [5, 6, 7, 8],
    prevPlace: [],
    moveLeft: moveLeft,
    cellsLeftToCheck: [0],
    moveRight: moveRight,
    cellsRightToCheck: [3],
    moveDown: moveDown,
    cellsDownToCheck: [0, 1, 2, 3],
    rotate: rotate,
    color: "",
  },
  {
    name: "z",
    cells: [5, 15, 16, 26],
    prevPlace: [],
    moveLeft: moveLeft,
    cellsLeftToCheck: [0, 1],
    moveRight: moveRight,
    cellsRightToCheck: [2, 3],
    moveDown: moveDown,
    cellsDownToCheck: [1, 3],
    rotate: rotate,
    color: "",
  },
  {
    name: "T",
    cells: [5, 6, 7, 16],
    prevPlace: [],
    moveLeft: moveLeft,
    cellsLeftToCheck: [0, 3],
    moveRight: moveRight,
    cellsRightToCheck: [2, 3],
    moveDown: moveDown,
    cellsDownToCheck: [0, 2, 3],
    rotate: rotate,
    color: "",
  },
  {
    name: "point",
    cells: [5],
    prevPlace: [],
    moveLeft: moveLeft,
    cellsLeftToCheck: [0],
    moveRight: moveRight,
    cellsRightToCheck: [0],
    moveDown: moveDown,
    cellsDownToCheck: [0],
    color: "",
  },
  {
    name: "L",
    cells: [5, 15, 25, 26],
    prevPlace: [],
    moveLeft: moveLeft,
    cellsLeftToCheck: [0, 1, 2],
    moveRight: moveRight,
    cellsRightToCheck: [0, 1, 3],
    moveDown: moveDown,
    cellsDownToCheck: [2, 3],
    rotate: rotate,
    color: "",
  },
];
function getNextRotationCells(tetromino) {
  var x = tetromino.cells[1] % 10;
  var y = Math.floor(tetromino.cells[1] / 10);
  var nextCells = tetromino.cells.map(function (index) {
    x_cell = index % 10;
    y_cell = Math.floor(index / 10);
    return (x_cell - x + y) * 10 - (y_cell - y) + x;
  });
  return nextCells;
}
function checkMovement(nextCells, currentCells) {
  const allCells = document.querySelectorAll("#table td");
  for (let i = 0; i < nextCells.length; i++) {
    if (nextCells[i] < 0 || nextCells[i] >= 160) return true;
    // if (Math.floor(nextCells[i] / 10) !== Math.floor(currentCells[i] / 10))
    //   return true;
    if (
      allCells[nextCells[i]].style.backgroundColor !== "" &&
      !currentCells.includes(nextCells[i])
    ) {
      return true;
    }
  }
  return false;
}
function moveLeft() {
  const nextCells = this.cells.map(function (cell) {
    return cell - 1;
  });
  if (checkMovement(nextCells, this.cells)) return false;
  this.prevPlace = [...this.cells];
  this.cells = nextCells;
}
function moveRight() {
  const nextCells = this.cells.map(function (cell) {
    return cell + 1;
  });
  if (checkMovement(nextCells, this.cells)) return false;
  this.prevPlace = [...this.cells];
  this.cells = nextCells;
}
function moveDown() {
  const nextCells = this.cells.map(function (cell) {
    return cell + 10;
  });
  if (checkMovement(nextCells, this.cells)) return false;
  this.prevPlace = [...this.cells];
  this.cells = [...nextCells];
  return true;
}
function rotate() {
  const nextCells = getNextRotationCells(this);
  if (!checkMovement(nextCells, this.cells)) {
    this.prevPlace = [...this.cells];
    this.cells = nextCells;
  }
}
function reachLimite(cells) {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i] + 10 > 160) return true;
  }
  return false;
}

function renderUiTetrominos(tetromino) {
  const allCells = document.querySelectorAll("#table td");
  tetromino.prevPlace.forEach(function (index) {
    allCells[index].style.backgroundColor = "";
  });
  tetromino.cells.forEach(function (index) {
    allCells[index].style.backgroundColor = tetromino.color;
  });
}
addEventListener("DOMContentLoaded", (event) => {
  function init() {
    document.getElementById("hightScore").innerText =
      localStorage.getItem("hightScore") || "0";

    return {
      score: 0,
      hightScore: localStorage.getItem("hightScore") || 0,
      pause: false,
      start: function () {
        timerTostart();
        setTimeout(function () {
          dropTetormino();
        }, 5000);
      },
      reset: resetGame,
    };
  }
  function timerTostart() {
    document.getElementById("timer-to-start").style.display = "block";
    document.getElementById("timerValue").innerText = 5;
    setTimeout(function () {
      document.getElementById("timerValue").innerText = 4;
    }, 1000);
    setTimeout(function () {
      document.getElementById("timerValue").innerText = 3;
    }, 2000);
    setTimeout(function () {
      document.getElementById("timerValue").innerText = 2;
    }, 3000);
    setTimeout(function () {
      document.getElementById("timerValue").innerText = 1;
    }, 4000);
    setTimeout(function () {
      document.getElementById("timer-to-start").style.display = "none";
    }, 5000);
  }
  function dropTetormino() {
    var curentTet = creatTetormino();
    game.score += checkGrid();
    document.getElementById("score").innerText = game.score;
    console.log();
    if (checkLosing(curentTet.cells)) {
      if (game.hightScore < game.score) {
        document.getElementById("hightScore").innerText = game.score;
        localStorage.setItem("hightScore", game.score);
        game.hightScore = game.score;
      }
      document.getElementById("losing").style.display = "block";
      return;
    }
    renderUiTetrominos(curentTet);

    document.getElementById("moveLeft").onclick = () => {
      if (!game.pause) {
        curentTet.moveLeft();
        renderUiTetrominos(curentTet);
      }
    };
    document.getElementById("moveRight").onclick = () => {
      if (!game.pause) {
        curentTet.moveRight();
        renderUiTetrominos(curentTet);
      }
    };
    document.getElementById("rotate").onclick = () => {
      if (!game.pause) {
        curentTet.rotate();
        renderUiTetrominos(curentTet);
      }
    };
    game.dropInterval = setInterval(function () {
      if (!game.pause) {
        var check = curentTet.moveDown();
        renderUiTetrominos(curentTet);
        if (reachLimite(curentTet.cells) || !check) {
          clearInterval(game.dropInterval);
          setTimeout(() => dropTetormino(), 100);
        }
      }
    }, 200);
  }
  function creatTetormino() {
    var teto = tetrominos[Math.floor(Math.random() * 6)];
    return {
      ...teto,
      cells: [...teto.cells],
      prevPlace: [...teto.prevPlace],
      moveLeft: teto.moveLeft,
      moveRight: teto.moveRight,
      moveDown: teto.moveDown,
      color: getRandomColor(),
    };
  }
  function resetGame() {
    const allCells = document.querySelectorAll("#table td");
    allCells.forEach((cell) => (cell.style.backgroundColor = ""));
    if (game.dropInterval) {
      clearInterval(game.dropInterval);
    }
    this.score = 0;
    this.pause = false;
    timerTostart();
    setTimeout(function () {
      dropTetormino();
    }, 5000);
  }
  var game = init();
  game.start();
  document.getElementById("pauseBtn").onclick = function () {
    game.pause = !game.pause;
    document.getElementById("rest-section").style.display = "block";
  };
  document.getElementById("rest").onclick = function () {
    game.reset();
    document.getElementById("rest-section").style.display = "none";
  };
  document.getElementById("close").onclick = function () {
    game.pause = false;
    document.getElementById("rest-section").style.display = "none";
  };
  document.getElementById("rest-losing").onclick = function () {
    game.reset();
    document.getElementById("losing").style.display = "none";
  };
});
