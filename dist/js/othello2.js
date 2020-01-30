const TABLE_ID = getUrlVars().tableId;
const MY_NAME = getUrlVars().player;
const MY_COLOR = parseInt(getUrlVars().color);
const Y_AXIS = 8;
const X_AXIS = 8;
const BLACK = "0";
const WHITE = "1";

var cells = []; // セルの状態
var currentColor = BLACK; // 現在のプレイヤー
var counts = { hint0: 0, hint1: 0, black: 0, white: 0}; // コマとヒントの数

$(function() {
  if (TABLE_ID === undefined) {
    alert("tableIdが指定されてません。\ntableIdを指定してください。")
    location.href = "./roomsearch.php";
  } else {
    addStyle();
    initPusher();
    addEvents();
    createInitialData();
    refresh();
  }
});

function addStyle() {
  $("body").append(`<style>.currentPlayer {background-color: #083a;}</style>`);
}

// pusher初期化
function initPusher() {
  pusher.subscribe(TABLE_ID).bind("plot", function(data) {
    console.log(data);
    plot(data.x, data.y, data.color);
  });
}

// コマの裏返し処理
function plot(x, y, color) {
  if (
    cells[y][x].contents === ""
    && cells[y][x].hint !== ""
  ) {
    flip(x, y, color);

    // (表示をさせずに)次のプレイヤーのhint数を得るために個別に関数を実行
    let nextColor = getOpponentColor();
    refresh_hint(nextColor); 
    refresh_counts_data();
    
    if (
      !(counts.hint0 === 0 && nextColor === BLACK)
      && !(counts.hint1 === 0 && nextColor === WHITE)
    ) {
      currentColor = nextColor; // プレイヤー変更
    }
    refresh();
  }
}

// クリックイベント
function addEvents() {
  $(document).on("click", ".grid", function () {
    var y = $(this).data("y");
    var x = $(this).data("x");
    var hint = $(this).data("hint");
    if( hint === MY_COLOR ) sendToPusher(parseInt(x), parseInt(y), MY_COLOR);
    // sendToPusher(parseInt(x), parseInt(y), MY_COLOR);
  });
}

// データの初期化
function createInitialData() {
  cells=[];
  for (var y = 0; y < Y_AXIS; y++) {
    var tmp_row = [];
    for (var x = 0; x < X_AXIS; x++) {
      tmp_row.push({ x:x, y:y, contents: "", hint: "" });
    }
    cells.push(tmp_row);
  }
  cells[4][3].contents = cells[3][4].contents = BLACK;
  cells[3][3].contents = cells[4][4].contents = WHITE;
}

// 相手の駒を取得
function getOpponentColor(color = currentColor) {
  return color === BLACK ? WHITE : BLACK;
}

// コマを裏返す
function flip(x, y, color) {
  cells[y][x].contents = color; // クリック位置にコマを配置
  // flipByDirection(x, y, color, [-1, 0]); // [y,x]
  // flipByDirection(x, y, color, [1, 0]);
  // flipByDirection(x, y, color, [0, -1]);
  // flipByDirection(x, y, color, [0, 1]);
  // flipByDirection(x, y, color, [-1, -1]);
  // flipByDirection(x, y, color, [-1, 1]);
  // flipByDirection(x, y, color, [1, -1]);
  // flipByDirection(x, y, color, [1, 1]);

  // ↑はこんな書き方↓もできます。参考まで。
  [
    [-1, 0],[1, 0],[0, -1],[0, 1],[-1, -1],[-1, 1],[1, -1],[1, 1]
  ].map(i=>{
    flipByDirection(x, y, color, i);
  });
}

// pusher送信
function sendToPusher(x, y, color) {
  let url = `./sender.php?tableId=${TABLE_ID}&type=plot&x=${x}&y=${y}&color=${color}`;
  $.get(url, function(_, status) {
    if (status != "success") console.log("送信エラー");
  });
}

// 各方向にコマを裏返しcellsに反映
function flipByDirection(x, y, color, direction) {
  let sy = direction[0];
  let sx = direction[1];
  var chainY = parseInt(y) + sy;
  var chainX = parseInt(x) + sx;
  var arr = [];
  var change = [];

  while ( 
    chainY >= 0 
    && chainY < Y_AXIS 
    && chainX >= 0 
    && chainX < X_AXIS
  ) {
    arr.push(cells[chainY][chainX]);
    chainY += direction[0];
    chainX += direction[1];
  }

  for(var i=0; i<arr.length; i++) {
    if( arr[i].contents === "" || i === arr.length - 1 ) {
      change = [];
      break;
    } else if ( arr[i].contents === getOpponentColor() ) {
      change.push(arr[i]);
    } else {
      for(var j=0; j<change.length; j++) {
        change[j].contents = color;
      }
      break;
    }
  }
}

// 結果発表
function showWinner() {
  if (counts.black > counts.white) {
    console.log("winner Black!!");
  } else if (counts.black < counts.white) {
    console.log("winner White!!");
  } else {
    console.log("This game is a draw...");
  }
  console.log(`black:${counts.black} white:${counts.white}`);
}

// cellsとcurrentColorよりヒントを作成し、カウント数を更新。勝敗判定まで
function refresh() {
  refresh_hint(); // ヒント情報を cellsに反映
  refresh_counts_data(); // 白黒とヒント数を集計してcountsを更新
  refresh_board(); // cells情報をボードに表示
  // dump();

  if (
    counts.hint0 + counts.hint1 === 0
    || counts.black + counts.white === X_AXIS * Y_AXIS
    || counts.black === 0
    || counts.white === 0
  ) showWinner(); // 終了判定
}

// ヒント情報を cellsに反映
function refresh_hint(color = currentColor) {
  for (var y = 0; y < Y_AXIS; y++) {
    for (var x = 0; x < X_AXIS; x++) {
      cells[y][x].hint = "";
      if( cells[y][x].contents === "") {
        refreshHintByDirection(x, y, color, [-1, 0]);
        refreshHintByDirection(x, y, color, [1, 0]);
        refreshHintByDirection(x, y, color, [0, -1]);
        refreshHintByDirection(x, y, color, [0, 1]);
        refreshHintByDirection(x, y, color, [-1, -1]);
        refreshHintByDirection(x, y, color, [-1, 1]);
        refreshHintByDirection(x, y, color, [1, -1]);
        refreshHintByDirection(x, y, color, [1, 1]);
      }
    }
  }
}

// 各方向毎にhint判定
function refreshHintByDirection(x, y, color, direction) {
  var chainY = y;
  var chainX = x;
  var canFlip = false;
  var arr = [];

  while ( 
    chainY >= 0 
    && chainY < Y_AXIS 
    && chainX >= 0 
    && chainX < X_AXIS
  ) {
    arr.push(cells[chainY][chainX]);
    chainY += direction[0];
    chainX += direction[1];
  }

  for(var i=1; i<arr.length; i++) {
    if( arr[i].contents === "" || i === arr.length - 1 ) {
      canFlip = false;
      break;
    } else if ( arr[i].contents === getOpponentColor(color) ) {
      canFlip = true;
    } else {
      if(canFlip && cells[y][x].hint !== color) {
        cells[y][x].hint = color;
      }
      break;
    }
  }
}

// 白黒とヒント数を集計してcountsを更新
function refresh_counts_data() {
  counts = { hint0: 0, hint1: 0, black: 0, white: 0};
  for (var y = 0; y < Y_AXIS; y++) {
    for (var x = 0; x < X_AXIS; x++) {
      if (cells[y][x].hint === BLACK) counts.hint0++;
      if (cells[y][x].hint === WHITE) counts.hint1++;
      if (cells[y][x].contents === BLACK) counts.black++;
      if (cells[y][x].contents === WHITE) counts.white++;
    }
  }
}

// cellsとcountsを元に板を更新
function refresh_board() {
  $(".board").html("");
  for (var y = 0; y < Y_AXIS; y++) {
    var tmp_row = $(`<div class="row y${y}"></div>`);
    for (var x = 0; x < X_AXIS; x++) {
      var tmp_hint = cells[y][x].hint !== "" 
        ? `<div class="hint${cells[y][x].hint}"></div>` 
        : "";
      var tmp_piede = `<div class="pieces${cells[y][x].contents}">${tmp_hint}</div>`;
      $(tmp_row).append(`
        <div class="grid"
          data-x=${x}
          data-y=${y}
          data-hint="${cells[y][x].hint}"
          data-contents=${cells[y][x].contents}
        >${tmp_piede}</div>`
      );
    }
    $(".board").append(tmp_row);
  }
  $(".player1")[0].children[2].innerHTML = "×" + counts.black;
  $(".player2")[0].children[2].innerHTML = "×" + counts.white;
  $(".player1, .player2").removeClass("currentPlayer");
  let player = currentColor == BLACK ? ".player1" : ".player2";
  $(player).addClass("currentPlayer");
}

// 現在の変数を表示(開発用)
function dump() {
  for (var y = 0; y < Y_AXIS; y++) {
    var arr = [];
    for (var x = 0; x < X_AXIS; x++) {
      arr.push(cells[y][x].contents+":"+cells[y][x].hint);
    }
    console.log(arr);
  }
  console.log("currentColor:",currentColor,counts);
}