<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>チャット</title>
<link rel="stylesheet"  href="./css/style.css">
<script src="./js/app.js"></script>
</head>
<body>

    <div id="gamevs" class="dai">
        <div class="waku1">
            <img src="./img/koma_kuro.png" width="40px" height="40px" class="black">
            <div class="name1"><form><input type="text" size="15px" class="boder1"></form></div>
            <p class="sente">先手</p>
            <p class="byou1">残15秒</p>
        </div>
        <div class="vsmoji">
            <p class="vs">VS</p>
        </div>
        <div class="waku2">
            <img src="./img/koma_siro.png" width="40px" height="40px" class="white">
            <div class="name2"><form><input type="text" size="15px" class="boder1"></form></div>
            <p class="gote">後手</p>
            <p class="byou2">残15秒</p>
        </div>
    </div>
            
    <div id="gamechatto" align="center">
        <h1>チャット</h1>
        <div class="chattoran">
            <div class="message left">
                <div class="message_box">
                    <div class="message_text">aaaaaaaaaaaaaaaaaaaaa</div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="message right">
                <div class="message_box">
                    <div class="message_text">aaaaaa</div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <form action="" method="post">
            <input type="text" name="name" size="20" class="chattosousin">
            <input type="submit" value="送信" class="">
        </form>
    </div>

<div id="navi">
    <a href="index.html">TOP</a>
    <a href="match_2.html">MATCH</a>
    <a href="roomsearch_3.html">ROOM SEARCH</a>
    <a href="roommake_4.html">ROOM MAKE</a>
    <a href="game.html">GAME</a>
</div>
</body>
</html>