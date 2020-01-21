var tableId = "";
var playerId = "";
var player = "";
var players = [];
var playerColor = "";
var limitTIme = 1000;

const EVENT_SEATCHECK = "seatCheck";
const EVENT_RECEIVE_SEATCHECK = "reseiveSeatCheck";
const EVENT_REFRESH_PLAYERS = "refreshPlayers";

$(function() {
    init();
});

function init() {

    tableId = getUrlVars().tableId;
    player = getUrlVars().player;
    // console.log(tableId, player, playerId);

    // Pusher.logToConsole = true;
    var pusher = new Pusher('ac2b1faa8b9a8094de41', {
        cluster: 'ap3',
        forceTLS: true
    });
    var channel = pusher.subscribe(tableId);

    channel.bind("seatCheck", function(data) {
        sendMyInfo(data);
    }).bind(EVENT_RECEIVE_SEATCHECK, function(data) {
        reseiveSeatCheck(data);
    }).bind(EVENT_REFRESH_PLAYERS, function(data) {
        refreshUserInfo();
    }).bind('pusher:subscription_succeeded', function() {
        checkSeat();
        setTimeout(function(){

            var flg = false;
            for(var i=0; i<players.length; i++){
                if(players[i].id==playerId) {
                    flg = true;
                }
            }
            if(!flg){
                playerId = "p" + Math.floor(Math.random()*100000);
                players.push({id:playerId,name:player,color:""});
                console.log(players);
            }

            if(players.length == 1) {
                playerColor = "b";
                players[0].color="b";
            } else if (players.length == 2) {
                playerColor = "w";
                players[1].color="w";
            }

            let url = `sender.php?tableId=${tableId}&type=${EVENT_REFRESH_PLAYERS}`;
            console.log(url);
            $.get(url, function(data, status){
                if(status!="success") console.log("送信エラー");
            });

        } , limitTIme);
    });

}

function checkSeat() {
    let url = `sender.php?tableId=${tableId}&type=${EVENT_SEATCHECK}`;
    // console.log(url);
    $.get(url, function(data, status){
        if(status!="success") console.log("送信エラー");
    });
}

function sendMyInfo() {
    let jsonString = JSON.stringify(players);
    let url = `sender.php?tableId=${tableId}&type=${EVENT_RECEIVE_SEATCHECK}&playerId=${playerId}&player=${player}&playerColor=${playerColor}`;
    // console.log(url);
    $.get(url, function(data, status){
        if(status!="success") console.log("送信エラー");
    });

}

function reseiveSeatCheck(json) {
    let id = json.playerId;
    let name = json.player;
    let color = json.playerColor;
    if(id != "") {
        players.push({id:json.playerId, name:name, color:color});
    }
}

function refreshUserInfo() {
    console.log(player);
    $("#audience .container").html(``);
    for(var i=0; i<players.length; i++){
        if(players[i].color=="b") {
            $("#player1 .name").html(players[i].name);
            $("#player1 .playerId").html(players[i].id);
        }else if (players[i].color=="w") {
            $("#player2 .name").html(players[i].name);
            $("#player2 .playerId").html(players[i].id);
        }else{
            $("#audience .container").append(`<div><span class="name">${players[i].name}</span> ID:<span class="playerId">${players[i].id}</span></div>`);
        }
    }
}