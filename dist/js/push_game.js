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
console.log(getUrlVars());
const tableId = getUrlVars().tableId;
Pusher.logToConsole = true;
var pusher = new Pusher("ac2b1faa8b9a8094de41", {
  cluster: "ap3",
  forceTLS: true
});
