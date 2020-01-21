$(function(){
    $("body").append('<div id="navi"></div>')
    $("#navi").append(
        '<a href="index.php">TOP</a>',
        // '<a href="match_2.html">MATCH</a>',
        // '<a href="roomsearch_3.html">ROOM SEARCH</a>',
        // '<a href="roommake_4.html">ROOM MAKE</a>',
        '<a href="roomsearch.php">ROOM SEARCH</a>',
        '<a href="game.php">GAME</a>'
    )
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
