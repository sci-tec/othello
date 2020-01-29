$(function() {
  $("body").append('<div id="navi"></div>');
  $("#navi").append(
    '<a href="./index.php">TOP</a>',
    '<a href="./members.php">MEMBER</a>',
    '<a href="./sample/index.php">SESSION sample</a>'
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
    if (key != "") vars[key] = strDis(decodeURI(val));
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

var strDis = s => {
  var result = [];
  Array.from(s).forEach(el => {
    if (el.match(/^[A-Za-z0-9]*$/)) result.push(el);
  });
  return result.join("");
};
