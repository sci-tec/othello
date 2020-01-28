$(function() {
  $("body").append('<div id="navi"></div>');
  $("#navi").append(
    '<a href="index.php">TOP</a>',
    // '<a href="match_2.html">MATCH</a>',
    // '<a href="roomsearch_3.html">ROOM SEARCH</a>',
    // '<a href="roommake_4.html">ROOM MAKE</a>',
    '<a href="roomsearch.php">ROOM SEARCH</a>',
    '<a href="game.php">GAME</a>'
    // '<a href="http://localhost:28889/db_structure.php?server=1&db=database" target="_blank">phpMyAdmin</a>'
  );
});

Pusher.logToConsole = true;
var pusher = new Pusher("ac2b1faa8b9a8094de41", {
  cluster: "ap3",
  forceTLS: true
});

var getUrlVars = function() {
  var vars = {};
  var param = location.search.substring(1).split("&");
  for (var i = 0; i < param.length; i++) {
    var keySearch = param[i].search(/=/);
    var key = "";
    if (keySearch != -1) key = param[i].slice(0, keySearch);
    var val = param[i].slice(param[i].indexOf("=", 0) + 1);
    if (key != "") vars[key] = decodeURI(val);
  }
  return vars;
};

function escape_html(string) {
  if (typeof string !== "string") {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function(match) {
    return {
      "&": "&amp;",
      "'": "&#x27;",
      "`": "&#x60;",
      '"': "&quot;",
      "<": "&lt;",
      ">": "&gt;"
    }[match];
  });
}

// function clean(str) {
//   var retVal = "";
//   for (var i = 0; i < str.length; i++) {
//     retVal += isHanEisu(str.substr(i, 1)) ? str.substr(i, 1) : "";
//   }
//   return retVal;
// }

// function isHanEisu(str) {
//   str = str == null ? "" : str;
//   if (str.match(/^[A-Za-z0-9]*$/)) {
//     return true;
//   } else {
//     return false;
//   }
// }

var strDis = s => {
  var result = [];
  Array.from(s).forEach(el => {
    if (el.match(/^[A-Za-z0-9]*$/)) result.push(el);
  });
  return result.join("");
};
