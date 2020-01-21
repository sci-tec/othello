/*
 */

var row, yAxis, xAxis, player, myColor, opponentColor, pieces, hint, limit;
row = [];
yAxis = 8;
xAxis = 8;
player = 0; // 0:先攻(黒), 1:後攻(白)
myColor = 0;
opponentColor = 1;
limit = 30;
$(function() {
  initBoard();
  checkHint();
  boardCheck();
  countdown();
  putPieces();
});

function initBoard() {
  var row, grid, channel;
  console.log(tableId, colorNum);
  channel = pusher.subscribe(tableId);
  console.log(pusher, channel);
  channel.bind("plot", function(data) {
    console.log("plot");
    console.log(data);
    sendInfo(parseInt(data.x), parseInt(data.y), parseInt(data.color));
  });
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

function checkHint() {
  // ヒントを表示させる場所を探す
  searchHint([-1, 0]);
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

function putPieces() {
  $(".grid").click(function() {
    var y = Array.from(this.classList[1])[4];
    var x = Array.from(this.classList[1])[1];
    var color = parseInt(Array.from(hint)[16]);
    sendInfo(parseInt(x), parseInt(y), color);
    let url = `./sender.php?tableId=${tableId}&type=plot&x=${x}&y=${y}&color=${color}`;
    console.log(url);
    $.get(url, function(data, status) {
      console.log(data);
      console.log(status);
      if (status != "success") console.log("送信エラー");
    });
  });
}

function sendInfo(x, y, player) {
  var el = $(`.x${x}-y${y}`)[0];
  if (
    row[y][x].contents === "" &&
    el.innerHTML === hint &&
    player === colorNum
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
    el.innerHTML = `<div class="pieces${player}"></div>`;
    row[y][x].contents = player;
    pushDate(el.classList[1], row[y][x].contents);
    // プレイヤーを変える
    changePlayer();
    stop();
    countdown();

    // ヒントの表示をリセット
    resetHint();
    checkHint();
    // ボード内を監視
    boardCheck();
  }
}

function search(x, y, direction) {
  var chainY = y + direction[0];
  var chainX = x + direction[1];
  var change = [];
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

function resetHint() {
  for (var y = 0; y < yAxis; y++) {
    for (var x = 0; x < xAxis; x++) {
      if ($(`.x${x}-y${y}`)[0].innerHTML === hint) {
        $(`.x${x}-y${y}`)[0].innerHTML = '<div class="pieces"></div>';
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
  $(".player1")[0].children[2].innerHTML = "×" + black;
  $(".player2")[0].children[2].innerHTML = "×" + white;
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
    stop();
    $(".time_limit")[0].innerHTML = `残り ---秒`;
    console.log("winner Black!!");
    console.log(`black:${black} white:${white}`);
  } else if (black < white) {
    stop();
    $(".time_limit")[0].innerHTML = `残り ---秒`;
    console.log("winner White!!");
    console.log(`black:${black} white:${white}`);
  } else {
    stop();
    $(".time_limit")[0].innerHTML = `残り ---秒`;
    console.log("This game is a draw...");
    console.log(`black:${black} white:${white}`);
  }
}

function countdown() {
  $(".time_limit")[0].innerHTML = `残り ${limit}秒`;
  var time = limit;
  timer = setInterval(() => {
    time--;
    $(".time_limit")[0].innerHTML = `残り ${time}秒`;
    if (time < 1) {
      stop();
      // !player ? alert("黒がパスをしました。") : alert("白がパスをしました。");
      changePlayer();
      resetHint();
      checkHint();
      boardCheck();
      countdown();
    }
  }, 1000);
}

function stop() {
  clearInterval(timer);
}
function pushDate(position, color) {
  let url = `./sender.php?position=${position}&color=${color}&tableId=${tableId}`;
  // console.log(url);
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    // フォーム要素の内容をハッシュ形式に変換
    timeout: 5000
  })
    .done(function(data) {
      // 通信成功時の処理を記述
      console.log("push done");
    })
    .fail(function(e) {
      // 通信失敗時の処理を記述
      console.log("push fail");
      // console.log(e);
    });
}
