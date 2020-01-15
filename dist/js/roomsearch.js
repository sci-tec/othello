var getUrlVars = function(){
    var vars = {}; 
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
        var keySearch = param[i].search(/=/);
        var key = '';
        if(keySearch != -1) key = param[i].slice(0, keySearch);
        var val = param[i].slice(param[i].indexOf('=', 0) + 1);
        if(key != '') vars[key] = decodeURI(val);
    } 
    return vars; 
  }

$(function(){
   console.log("test"); 
    $(".myButton5").click(function(){
        console.log("test2"); 
        window.location.href = '/game.php?tableId=table001&player='+getUrlVars().player;
    })
});