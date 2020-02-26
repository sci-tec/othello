var canClick = true;

const Model = (() => {
  const Data = {
    tableId: strDis(session_roomId), // getUrlVars().tableId
    myName: strDis(session_userName), // getUrlVars().player
    myColor: parseInt(session_myColor), // parseInt(getUrlVars().color)
    // opponentName: "",
    y_Axis: 8,
    x_Axis: 8,
    black: "0",
    white: "1",
    direction: [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ]
  };
  var data = {
    cells: [],
    currentColor: Data.black,
    contents: {
      hint0: 0,
      hint1: 0,
      black: 0,
      white: 0
    },
    result: "",
    hint: 0,
    passCount: 0,
    members: Data.myColor !== 2 ? [Data.myName, ""] : ["", ""],
    opponentColor: () => {
      if (Data.myColor === 0) {
        return 1;
      } else if (Data.myColor === 1) {
        return 0;
      }
    }
  };
  const totalCells = Data.y_Axis * Data.x_Axis;

  const createInitialData = () => {
    for (var y = 0; y < Data.y_Axis; y++) {
      var row = [];
      for (var x = 0; x < Data.x_Axis; x++) {
        row.push({
          x: x,
          y: y,
          contents: "",
          hint: ""
        });
      }
      data.cells.push(row);
    }
    // 初期
    data.cells[4][3].contents = data.cells[3][4].contents = Data.black;
    data.cells[3][3].contents = data.cells[4][4].contents = Data.white;

    // data.cells[2][4].contents = Data.black;
    // data.cells[3][3].contents = Data.black;
    // data.cells[3][4].contents = Data.white;
    // data.cells[3][5].contents = Data.black;
    // data.cells[4][2].contents = Data.black;
    // data.cells[4][3].contents = Data.black;
    // data.cells[4][4].contents = Data.white;
    // data.cells[4][5].contents = Data.black;
    // data.cells[4][6].contents = Data.black;
    // data.cells[5][3].contents = Data.white;
    // data.cells[5][4].contents = Data.white;
    // data.cells[5][5].contents = Data.white;
    refreshHint();
  };

  const getOpponentColor = (color = data.currentColor) =>
    color === Data.black ? Data.white : Data.black;

  const flipByDirection = (x, y, color, direction) => {
    const dirY = direction[0];
    const dirX = direction[1];
    var chainY, chainX, arr;
    chainY = parseInt(y) + dirY;
    chainX = parseInt(x) + dirX;
    arr = [];
    while (
      chainY >= 0 &&
      chainY < Data.y_Axis &&
      chainX >= 0 &&
      chainX < Data.x_Axis
    ) {
      arr.push(data.cells[chainY][chainX]);
      chainY += dirY;
      chainX += dirX;
    }
    if (
      arr.length &&
      arr[0].contents === getOpponentColor() &&
      (arr.map(el => el.contents).indexOf(color) !== -1 ||
        arr.map(el => el.contents).indexOf("") !== -1)
    ) {
      var change = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].contents === getOpponentColor()) {
          change.push(arr[i]);
        } else if (arr[i].contents === color) {
          break;
        } else {
          change = [];
          break;
        }
      }
      change.forEach(el => (el.contents = color));
    }
  };

  const refreshHint = (color = data.currentColor) => {
    for (var y = 0; y < Data.y_Axis; y++) {
      for (var x = 0; x < Data.x_Axis; x++) {
        data.cells[y][x].hint = "";
        if (data.cells[y][x].contents === "") {
          Data.direction.forEach(el => hintByDirection(x, y, color, el));
        }
      }
    }
  };

  const hintByDirection = (x, y, color, direction) => {
    const dirY = direction[0];
    const dirX = direction[1];
    var chainY, chainX;
    chainY = y + dirY;
    chainX = x + dirX;
    while (
      chainY + dirY >= 0 &&
      chainY + dirY < Data.y_Axis &&
      chainX + dirX >= 0 &&
      chainX + dirX < Data.x_Axis &&
      data.cells[chainY][chainX].contents === getOpponentColor()
    ) {
      if (data.cells[chainY + dirY][chainX + dirX].contents === color) {
        data.cells[y][x].hint = color;
        break;
      }
      chainY += dirY;
      chainX += dirX;
    }
  };

  const changePlayer = color => {
    data.currentColor = color === Data.black ? Data.white : Data.black;
    refreshHint();
  };

  const gameResult = (black, white) => {
    if (black > white) {
      Data.black == Data.myColor
        ? (data.result = "win")
        : (data.result = "lose");
    } else if (white > black) {
      Data.white == Data.myColor
        ? (data.result = "win")
        : (data.result = "lose");
    } else if (black == white) data.result = "draw";

    if (Data.myColor === 2) {
      data.result = "ShowResult";
    }
  };

  createInitialData();
  return {
    getData: () => [Data, data],
    countPieces: () => {
      Object.keys(data.contents).forEach(el => (data.contents[el] = 0));
      for (var y = 0; y < Data.y_Axis; y++) {
        for (var x = 0; x < Data.x_Axis; x++) {
          if (data.cells[y][x].contents == Data.black) data.contents.black++;
          if (data.cells[y][x].contents == Data.white) data.contents.white++;
          if (data.cells[y][x].hint == Data.black) data.contents.hint0++;
          if (data.cells[y][x].hint == Data.white) data.contents.hint1++;
        }
      }
      var empty = totalCells - (data.contents.black + data.contents.white);
      if (data.passCount === 1 && data.hint) {
        data.passCount = 0;
      } else if (
        !empty ||
        !data.contents.black ||
        !data.contents.white ||
        (data.passCount === 1 && !data.hint)
      ) {
        gameResult(data.contents.black, data.contents.white);
      } else if (!data.hint && !data.passCount) {
        data.passCount++;
        changePlayer(data.currentColor);
      }
    },
    flip: (x, y, color) => {
      data.cells[y][x].contents = color;
      Data.direction.forEach(el => flipByDirection(x, y, color, el));
      changePlayer(data.currentColor);
    },
    resetData: () => {
      data = {
        cells: [],
        currentColor: Data.black,
        contents: {
          hint0: 0,
          hint1: 0,
          black: 0,
          white: 0
        },
        result: "",
        hint: 0,
        passCount: 0
      };
      createInitialData();
    }
  };
})();

const View = (() => {
  const DomString = {
    board: $(".board"),
    row: y => $(`<div class="row y${y}"></div>`),
    cell: (y, x, hint = "", contents = "") =>
      `<div class="cell" data-y=${y} data-x=${x} data-hint='${hint}' data-contents=${contents}></div>`,
    pieces0: `<div class="pieces0"></div>`,
    pieces1: `<div class="pieces1"></div>`,
    hint0: `<div class="hint0"></div>`,
    hint1: `<div class="hint1"></div>`,
    player0: $(".player0"),
    player1: $(".player1"),
    result: $(".result"),
    currentPlayer: "current_player",
    win: $(".win"),
    lose: $(".lose"),
    draw: $(".draw"),
    ShowResult: $(".ShowResult"),
    cover: $(".cover"),
    retry: $(".retry")
  };

  return {
    dom: () => DomString,
    showNames: (nameB, colorB, nameW, colorW) => {
      DomString[`player${colorB}`].children()[1].textContent = nameB;
      DomString[`player${colorW}`].children()[1].textContent = nameW;
    },
    viewCurrentPlayer: color => {
      DomString.player0.removeClass(DomString.currentPlayer);
      DomString.player1.removeClass(DomString.currentPlayer);
      DomString[`player${color}`].addClass(DomString.currentPlayer);
    },
    currentPiecesNum: (black, white) => {
      DomString.player0.children()[2].textContent = `×${black}`;
      DomString.player1.children()[2].textContent = `×${white}`;
    },
    gameResult: (result, black, white) => {
      if (result === "win" || result === "lose") {
        DomString[`${result}`].css("display", "block");
      } else if (result === "ShowResult") {
        var gameResult = black > white ? "Winner: Black" : "Winner: White";
        DomString[
          `${result}`
        ][0].children[0].textContent = `ShowResult\n${gameResult}\nBlack:${black} White:${white}`;
        DomString[`${result}`].css("display", "block");
      } else {
        DomString[`${result}`].css("display", "block");
      }
      DomString.player0.removeClass(DomString.currentPlayer);
      DomString.player1.removeClass(DomString.currentPlayer);
    }
  };
})();

const Controller = ((model, view) => {
  const data = model.getData();
  const dom = view.dom();

  const gameStart = () => {
    dom.board.html("");
    if (!data[0].tableId) {
      alert("tableIdが指定されてません。\ntableIdを指定してください。");
    } else {
      initPusher();
      if (data[0].myColor !== 2) {
        sendName();
      }
      refresh();
    }
  };

  const reflectData_board = () => {
    dom.board.html("");
    data[1].hint = 0;
    var cells = data[1].cells,
      row,
      cell;
    for (var y = 0; y < data[0].y_Axis; y++) {
      row = dom.row(y);
      for (var x = 0; x < data[0].x_Axis; x++) {
        if (cells[y][x].contents !== "") {
          cell = $(dom.cell(y, x)).append(dom[`pieces${cells[y][x].contents}`]);
        } else if (cells[y][x].hint !== "") {
          data[1].hint++;
          cell = $(dom.cell(y, x)).append(dom[`hint${cells[y][x].hint}`]);
        } else {
          cell = $(dom.cell(y, x));
        }
        row.append(cell);
      }
      dom.board.append(row);
    }
  };

  const reflectData_board2 = () => {
    model.countPieces();
    view.currentPiecesNum(data[1].contents.black, data[1].contents.white);
    if (data[1].result !== "") {
      view.gameResult(
        data[1].result,
        data[1].contents.black,
        data[1].contents.white
      );
      if (!data[0].myColor) {
        postResult();
      }
    }
  };

  const refresh = (color = data[1].currentColor) => {
    view.viewCurrentPlayer(color);
    reflectData_board();
    reflectData_board2();
    if (data[1].hint === 0 && data[1].result === "") {
      refresh();
    }
    if (amIBlack()) shareToPusher();
  };

  const shareToPusher = () => {
    let shareData = getShareData();
    // let url = `./sender.php?tableId=${data[0].tableId}&type=update&black=${shareData.black}&white=${shareData.white}&currentColor=${shareData.currentColor}&cells=${shareData.cells}`;
    let url = `./sender.php?tableId=${data[0].tableId}&type=update&currentColor=${shareData.currentColor}&cells=${shareData.cells}`;
    // console.log(url);
    $.get(url, function(_, status) {
      if (status != "success") console.log("送信エラー");
    });
  };

  const getShareData = () => {
    var retVal;
    var stringCells = "";
    // let myName = model.getData()[0].myName;
    // let opponentName = model.getData()[0].opponentName;
    let currentColor = model.getData()[1].currentColor;
    model.getData()[1].cells.forEach((row, y) => {
      row.forEach((item, x) => {
        if (y !== 0 || x !== 0) stringCells += "";
        stringCells += `${item.contents || "n"}${item.hint || "n"}`;
      });
    });

    if (amIBlack()) {
      retVal = {
        // black: myName,
        // white: opponentName,
        currentColor: currentColor,
        cells: stringCells
      };
    } else {
      retVal = {
        // black: opponentName,
        // white: myName,
        currentColor: currentColor,
        cells: stringCells
      };
    }
    return retVal;
  };

  const getArrayFromShareData = cells => {
    var arr = [];
    for (var i = 0; i < cells.length; i += 2) arr.push(cells.substr(i, 2));
    var retVal = [];
    for (var y = 0; y < model.getData()[0].y_Axis; y++) {
      var row = [];
      for (var x = 0; x < model.getData()[0].x_Axis; x++) {
        let idx = y * 8 + x;
        let contents =
          arr[idx].substr(0, 1) === "n" ? "" : arr[idx].substr(0, 1);
        let hint = arr[idx].substr(1, 1) === "n" ? "" : arr[idx].substr(1, 1);
        row.push({ x: x, y: y, contents: contents, hint, hint });
      }
      retVal.push(row);
    }
    return retVal;
  };

  const refreshWithData = (currentColor, cells) => {
    if (!amIBlack()) {
      model.getData()[1].currentColor = currentColor;
      model.getData()[1].cells = cells;
      refresh();
    }
  };

  const amIBlack = () => model.getData()[0].myColor == model.getData()[0].black;

  const initPusher = () => {
    var sendNameCount = 0;
    var channel = pusher.subscribe(data[0].tableId);
    channel.bind("pusher:subscription_succeeded", function(members) {
      // alert('successfully subscribed!');
    });
    channel.bind("update", function(data) {
      // let nameBlack = data.black;
      // let nameWhite = data.white;
      let currentColor = data.currentColor;
      let cells = getArrayFromShareData(data.cells);
      // refreshWithData(nameBlack, nameWhite, currentColor, cells);
      refreshWithData(currentColor, cells);
    });
    channel.bind("plot", function(data) {
      if (amIBlack()) {
        if (
          model.getData()[1].cells[data.y][data.x].hint !== "" &&
          model.getData()[1].cells[data.y][data.x].contents === ""
        ) {
          model.flip(strDis(data.x), strDis(data.y), strDis(data.color));
          refresh();
        }
      }
      canClick = true;
    });
    channel.bind("finish", function(data) {
      if (model.getData()[1].result !== "") {
        dom.cover.css("display", "block");
        canClick = true;
      }
    });
    channel.bind("restart", function(data) {
      if (model.getData()[1].result !== "") {
        reset();
        canClick = true;
      }
    });
    channel.bind("name", function(data) {
      let members = model.getData()[1].members;
      if (model.getData()[0].myColor === 2) {
        members[data.color] = data.name;
        if (members[0] !== "" && members[1] !== "") {
          let player0 = members[0];
          let player1 = members[1];
          view.showNames(player0, 0, player1, 1);
        }
      } else if (sendNameCount < 1 && data.name !== model.getData()[0].myName) {
        members[1] = data.name;
        if (members[0] !== "") {
          sendNameCount++;
          let myName = members[0];
          let opponentName = members[1];
          let myColor = model.getData()[0].myColor;
          let opponentColor = model.getData()[1].opponentColor();
          view.showNames(myName, myColor, opponentName, opponentColor);
          sendName();
          canClick = true;
        }
      }
    });
  };

  const senderToPusher = (x, y, color) => {
    let url = `./sender.php?tableId=${data[0].tableId}&type=plot&x=${x}&y=${y}&color=${color}`;
    canClick = false;
    $.get(url, function(_, status) {
      if (status != "success") console.log("送信エラー");
    });
  };

  const addEvents = () => {
    $(document).on("click", ".cell", function() {
      if (
        canClick &&
        parseInt(data[1].currentColor) === data[0].myColor &&
        this.children[0] !== undefined &&
        this.children[0].className === `hint${data[0].myColor}`
      ) {
        var y = $(this).data("y");
        var x = $(this).data("x");
        senderToPusher(x, y, data[1].currentColor);
        // if (!data[1].hint && data[1].result === "") {
        //   senderToPusher(x, y, data[1].currentColor);
        // }
      }
    });
    $(document).on("dblclick", ".cell", function() {
      return false;
    });
  };

  const postResult = (
    postData = { winnerid: session_userId, loserid: session_opponentId }
  ) => {
    $.post("postResult.php", postData, function(result) {
      let url = `./sender.php?tableId=${data[0].tableId}&type=finish`;
      $.get(url, function(_, status) {
        if (status != "success") console.log("送信エラー");
      });
    });
  };

  const reset = () => {
    dom.cover.css("display", "none");
    dom[`${data[1].result}`].css("display", "none");
    model.resetData();
    data[1] = model.getData()[1];
    refresh();
  };

  const sendName = () => {
    // console.log(data[0], model.getData()[0]);
    let getData = model.getData()[0];
    let url = `./sender.php?tableId=${getData.tableId}&type=name&name=${session_userName}&color=${getData.myColor}`;
    $.get(url, function(_, status) {
      if (status != "success") console.log("送信エラー");
    });
  };

  gameStart();
  if (data[0].myColor !== 2) {
    addEvents();
    dom.retry.click(function(e) {
      let url = `./sender.php?tableId=${data[0].tableId}&type=restart`;
      $.get(url, function(_, status) {
        if (status != "success") console.log("送信エラー");
      });
    });
  } else {
    refresh();
  }
})(Model, View);
