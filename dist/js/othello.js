var row,
  yAxis,
  xAxis,
  player,
  myColor,
  opponentColor,
  pieces,
  hint,
  notEmpty,
  A;
row = [];
yAxis = 8;
xAxis = 8;
hint = '<div class="hint"></div>';
player = 0; // 0:先攻(黒), 1:後攻(白)
myColor = 0;
opponentColor = 1;
notEmpty = 4;
catPut = [];

$(function() {
  initBoard();
  putPieces();
});

function initBoard() {
  var row, grid;
  initInfo();
  // 初期盤面を作成
  for (var y = 0; y < yAxis; y++) {
    row = $(`<div class="row y${y}"></div>`);
    for (var x = 0; x < xAxis; x++) {
      if ((x === 3 && y === 4) || (x === 4 && y === 3)) {
        pieces = '<div class="pieces0"></div>';
        grid = $(`<div class="grid x${x}-y${y}">${pieces}</div></div>`);
      } else if ((x === 3 && y === 3) || (x === 4 && y === 4)) {
        pieces = '<div class="pieces1"></div>';
        grid = $(`<div class="grid x${x}-y${y}">${pieces}</div></div>`);
      } else {
        pieces = '<div class="pieces"></div>';
        grid = $(`<div class="grid x${x}-y${y}">${pieces}</div></div>`);
      }
      $(row).append(grid);
    }
    $(".board").append(row);
  }
}

function initInfo() {
  // 初期情報を作成
  for (var y = 0; y < yAxis; y++) {
    var grid = [];
    for (var x = 0; x < xAxis; x++) {
      if ((x === 3 && y === 4) || (x === 4 && y === 3)) {
        grid.push({
          coordinates: `x${x}-y${y}`,
          contents: 0
        });
      } else if ((x === 3 && y === 3) || (x === 4 && y === 4)) {
        grid.push({
          coordinates: `x${x}-y${y}`,
          contents: 1
        });
      } else {
        grid.push({
          coordinates: `x${x}-y${y}`,
          contents: ""
        });
      }
    }
    row.push(grid);
  }
}

function hint(array) {
  for (var y = 0; y < yAxis; y++) {
    for (var x = 0; x < xAxis; x++) {
      if (row[y][x].contents === "" && array.length !== 0) {
      }
    }
  }
}

function putPieces() {
  $(".grid").click(function() {
    for (var y = 0; y < yAxis; y++) {
      for (var x = 0; x < xAxis; x++) {
        if (
          this.classList[1] === row[y][x].coordinates &&
          row[y][x].contents === ""
        ) {
          changePieces(search(x, y, [-1, 0], "T")); // [y,x]
          changePieces(search(x, y, [1, 0], "B"));
          changePieces(search(x, y, [0, -1], "L"));
          changePieces(search(x, y, [0, 1], "R"));
          changePieces(search(x, y, [-1, -1], "TL"));
          changePieces(search(x, y, [-1, 1], "TR"));
          changePieces(search(x, y, [1, -1], "BL"));
          changePieces(search(x, y, [1, 1], "BR"));
          // console.log(row[y][x].coordinates, catPut);
          if (catPut.length !== 0) {
            // console.log(catPut);
            catPut = [];
            this.innerHTML = `<div class="pieces${player}"></div>`;
            row[y][x].contents = player;

            // プレイヤーを変える
            changePlayer();

            notEmpty++;
            if (notEmpty === 64) {
              decideWinner();
            }
          }
        }
      }
    }
  });
}

function search(x, y, direction, D) {
  var chainY = y + direction[0];
  var chainX = x + direction[1];
  var change = [];
  if (
    chainY >= 0 &&
    chainY < 8 &&
    chainX >= 0 &&
    chainX < 8 &&
    chainY + direction[0] >= 0 &&
    chainY + direction[0] < 8 &&
    chainX + direction[1] >= 0 &&
    chainX + direction[1] < 8
  ) {
    while (row[chainY][chainX].contents === opponentColor) {
      // console.log(row[chainY][chainX].coordinates, opponentColor);
      change.push(row[chainY][chainX]);
      // console.log(chainY, chainX, D);
      if (row[chainY + direction[0]][chainX + direction[1]].contents === "") {
        // console.log(
        //   row[chainY + direction[0]][chainX + direction[1]].coordinates
        // );
        change = [];
        break;
      } else if (
        row[chainY + direction[0]][chainX + direction[1]].contents === myColor
      ) {
        break;
      }
      chainY += direction[0];
      chainX += direction[1];
    }
  }
  return change;
}

function changePieces(array) {
  var grid;
  if (array.length !== 0) {
    // console.log(array.length);
    catPut.push(array.length);
    for (let i = 0; i < array.length; i++) {
      grid = $(`.${array[i].coordinates}`)[0];
      grid.innerHTML = `<div class="pieces${player}"></div>`;
      array[i].contents = player;
    }
  }
}

function changePlayer() {
  if (!player) {
    player = 1;
    myColor = 1;
    opponentColor = 0;
  } else {
    player = 0;
    myColor = 0;
    opponentColor = 1;
  }
}

function decideWinner() {
  var black = 0;
  var white = 0;
  for (var y = 0; y < yAxis; y++) {
    for (var x = 0; x < xAxis; x++) {
      if (row[y][x].contents === 0) {
        black++;
      } else if (row[y][x].contents === 1) {
        white++;
      }
    }
  }
  if (black > white) {
    console.log("winner Black!!");
  } else if (black < white) {
    console.log("winner White!!");
  } else {
    console.log("This game is a draw...");
  }
}
