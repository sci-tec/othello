var row, yAxis, xAxis, player, myColor, opponentColor, pieces, hint;
row = [];
yAxis = 8;
xAxis = 8;
player = 0; // 0:先攻(黒), 1:後攻(白)
myColor = 0;
opponentColor = 1;

// 処理
$(function() {
  initBoard();
  checkHint();
  boardCheck();
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
        pieces =
          '<div class="pieces" style="transform: rotateY(0deg);"><div class="pieces0"></div><div class="pieces1"></div></div>';
        grid = $(`<div class="grid x${x}-y${y}">${pieces}</div></div>`);
      } else if ((x === 3 && y === 3) || (x === 4 && y === 4)) {
        pieces =
          '<div class="pieces" style="transform: rotateY(180deg);"><div class="pieces0"></div><div class="pieces1"></div></div>';
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

function checkHint() {
  // ヒントを表示させる場所を探す
  searchHint([-1, 0]); // [y,x]
  searchHint([1, 0]);
  searchHint([0, -1]);
  searchHint([0, 1]);
  searchHint([-1, -1]);
  searchHint([-1, 1]);
  searchHint([1, -1]);
  searchHint([1, 1]);
}

function searchHint(direction) {
  var chainX, chainY;
  for (var y = 0; y < yAxis; y++) {
    for (var x = 0; x < xAxis; x++) {
      chainY = y + direction[0];
      chainX = x + direction[1];
      if (chainY >= 0 && chainY < 8 && chainX >= 0 && chainX < 8) {
        while (
          row[y][x].contents === "" &&
          row[chainY][chainX].contents === opponentColor
        ) {
          if (
            !row[chainY + direction[0]] ||
            !row[chainY + direction[0]][chainX + direction[1]]
          ) {
            break;
          } else if (
            row[chainY + direction[0]][chainX + direction[1]].contents ===
            myColor
          ) {
            if (!player) {
              hint = '<div class="hint0"></div>';
              $(`.x${x}-y${y}`)[0].innerHTML = hint;
            } else {
              hint = '<div class="hint1"></div>';
              $(`.x${x}-y${y}`)[0].innerHTML = hint;
            }
            break;
          }
          chainY += direction[0];
          chainX += direction[1];
        }
      }
    }
  }
}

function boardCheck() {
  var hintNum, hint0, hint1, notEmpty, black, white;
  hintNum = 0;
  hint0 = 0;
  hint1 = 0;
  notEmpty = 0;
  black = 0;
  white = 0;
  for (var y = 0; y < yAxis; y++) {
    for (var x = 0; x < xAxis; x++) {
      if ($(`.x${x}-y${y}`)[0].innerHTML === '<div class="hint0"></div>')
        hint0++;
      if ($(`.x${x}-y${y}`)[0].innerHTML === '<div class="hint1"></div>')
        hint1++;
      if (row[y][x].contents === 0 || row[y][x].contents === 1) notEmpty++;
      if (row[y][x].contents === 0) black++;
      if (row[y][x].contents === 1) white++;
    }
  }
  // $(".player0")[0].children[1].innerHTML = "×" + black;
  // $(".player1")[0].children[1].innerHTML = "×" + white;
  if ((!hint0 && player === 0) || (!hint1 && player === 1)) {
    changePlayer();
    checkHint();
    for (var y = 0; y < yAxis; y++) {
      for (var x = 0; x < xAxis; x++) {
        if ($(`.x${x}-y${y}`)[0].innerHTML === hint) {
          hintNum++;
        }
      }
    }
  }
  if (
    notEmpty === 64 ||
    (!hint0 && !hint1 && notEmpty !== 64 && !hintNum) ||
    !black ||
    !white
  )
    // 対戦結果を表示
    decideWinner();
}

function putPieces() {
  $(".grid").click(function() {
    for (var y = 0; y < yAxis; y++) {
      for (var x = 0; x < xAxis; x++) {
        if (
          this.classList[1] === row[y][x].coordinates &&
          row[y][x].contents === "" &&
          this.innerHTML === hint
        ) {
          // 駒の色を変更
          changePieces(search(x, y, [-1, 0])); // [y,x]
          changePieces(search(x, y, [1, 0]));
          changePieces(search(x, y, [0, -1]));
          changePieces(search(x, y, [0, 1]));
          changePieces(search(x, y, [-1, -1]));
          changePieces(search(x, y, [-1, 1]));
          changePieces(search(x, y, [1, -1]));
          changePieces(search(x, y, [1, 1]));

          if (!player) {
            this.innerHTML =
              '<div class="pieces" style="transform: rotateY(0deg);"><div class="pieces0"></div><div class="pieces1"></div></div>';
          } else {
            this.innerHTML =
              '<div class="pieces" style="transform: rotateY(180deg);"><div class="pieces0"></div><div class="pieces1"></div></div>';
          }
          row[y][x].contents = player;

          // プレイヤーの変更
          changePlayer();

          // ヒントの表示,リセット
          resetHint();
          checkHint();
          // ボード内を監視
          boardCheck();
        }
      }
    }
  });
}

function search(x, y, direction) {
  var chainY, chainX, change;
  chainY = y + direction[0];
  chainX = x + direction[1];
  change = [];
  if (chainY >= 0 && chainY < 8 && chainX >= 0 && chainX < 8) {
    while (row[chainY][chainX].contents === opponentColor) {
      change.push(row[chainY][chainX]);
      if (
        !row[chainY + direction[0]] ||
        !row[chainY + direction[0]][chainX + direction[1]] ||
        row[chainY + direction[0]][chainX + direction[1]].contents === ""
      ) {
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
    for (let i = 0; i < array.length; i++) {
      grid = $(`.${array[i].coordinates}`)[0];
      if (!player) {
        grid.children[0].style.transform = "rotateY(0deg)";
      } else {
        grid.children[0].style.transform = "rotateY(180deg)";
      }
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

function resetHint() {
  for (var y = 0; y < yAxis; y++) {
    for (var x = 0; x < xAxis; x++) {
      if ($(`.x${x}-y${y}`)[0].innerHTML === hint) {
        $(`.x${x}-y${y}`)[0].innerHTML = '<div class="pieces"></div>';
      }
    }
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
    console.log(`black:${black} white:${white}`);
  } else if (black < white) {
    console.log("winner White!!");
    console.log(`black:${black} white:${white}`);
  } else {
    console.log("This game is a draw...");
    console.log(`black:${black} white:${white}`);
  }
}
