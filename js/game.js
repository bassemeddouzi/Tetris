function getRandomColor() {
  const letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
var id = 0;
var tetrominos = [
  {
    name: "carry",
    cellPrincipaleIndex: 9,
    cells: [5, 6, 15, 16],
    prevPlace: [],
    nextLeft: nextLeft,
    nextRight: nextRight,
    nextDown: nextDown,
    color: "",
  },
  { name: "line" },
  { name: "z" },
  { name: "T" },
  { name: "point" },
];
function checkMovoment(cells, nextMov) {
  const allCells = document.querySelectorAll("#table td");
  switch (nextMov) {
    case "left":
      if (
        (cells[0] % 10) - 1 < 0 ||
        (cells[2] % 10) - 1 < 0 ||
        allCells[cells[0] - 1].style.backgroundColor !== "" ||
        allCells[cells[2] - 1].style.backgroundColor !== ""
      )
        return true;
      break;
    case "right":
      if (
        (cells[1] % 10) + 1 > 9 ||
        (cells[3] % 10) + 1 > 9 ||
        allCells[cells[1] + 1].style.backgroundColor !== "" ||
        allCells[cells[3] + 1].style.backgroundColor !== ""
      )
        return true;
      break;
    case "down":
      for (var i = 2; i < cells.length; i++) {
        if (
          cells[i] + 10 >= 160 ||
          allCells[cells[i] + 10].style.backgroundColor !== ""
        )
          return true;
      }
      break;
  }
  return false;
}
function nextLeft() {
  if (checkMovoment(this.cells, "left")) {
    return false;
  }
  this.prevPlace = [...this.cells];
  for (var i = 0; i < this.cells.length; i++) {
    this.cells[i]--;
  }
}
function nextRight() {
  if (checkMovoment(this.cells, "right")) {
    return false;
  }
  this.prevPlace = [...this.cells];
  for (var i = 0; i < this.cells.length; i++) {
    this.cells[i]++;
  }
}
function nextDown() {
  if (checkMovoment(this.cells, "down")) {
    return false;
  }
  this.prevPlace = [...this.cells];
  for (var i = 0; i < this.cells.length; i++) {
    this.cells[i] += 10;
  }
  return true;
}
function checkLimite(cells) {
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
    return {
      score: 0,
      highScore: localStorage.getItem("highScore") || 0,
      pause: false,
      start: function () {
        timerTostart();
        setTimeout(function () {
          dropTetormino();
        }, 5000);
      },
    };
  }
  function timerTostart() {
    // var i=5
    // var interval = setInterval(function(){
    //     document.getElementById("timerValue").innerText=i
    //     if(i===0)
    //         clearInterval(interval)
    // })
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
    game.currentTetromino = curentTet;
    game.score += checkGrid();
    if (checkLosing(curentTet.cells)) {
      if (game.highScore < game.score) game.highScore = game.score;
      console.log(game);
      return;
    }

    renderUiTetrominos(curentTet);

    document.getElementById("moveLeft").onclick = () => {
      if (!game.isPaused) {
        curentTet.nextLeft();
        renderUiTetrominos(curentTet);
      }
    };

    document.getElementById("moveRight").onclick = () => {
      if (!game.isPaused) {
        curentTet.nextRight();
        renderUiTetrominos(curentTet);
      }
    };

    game.dropInterval = setInterval(function () {
      if (!game.pause) {
        var check = curentTet.nextDown();
        renderUiTetrominos(curentTet);
        if (checkLimite(curentTet.cells) || !check) {
          clearInterval(game.dropInterval);
          setTimeout(() => dropTetormino(), 100);
        }
      }
    }, 1000);
  }

  function creatTetormino() {
    var teto = tetrominos[0];
    return {
      ...teto,
      id: id++,
      cells: [...teto.cells],
      prevPlace: [...teto.prevPlace],
      nextLeft: teto.nextLeft,
      nextRight: teto.nextRight,
      nextDown: teto.nextDown,
      color: getRandomColor(),
    };
  }
  var game = init();
  game.start();
  document.getElementById("pauseBtn").onclick = () => {
    game.pause = !game.pause;
  };
});
