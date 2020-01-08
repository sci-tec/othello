<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>チャット</title>
<link rel="stylesheet"  href="./css/style.css">
<script src="./js/app.js"></script>
</head>
<body id="game_chat">

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
        <form method="post" action="chat.php">
        名前　　　　<input type="text" name="name">
        メッセージ　<input type="text" name="message">
 
        <button name="send" type="submit">送信</button>
 
        <br>チャット履歴
        <section>
    </form>
 
 
 
</body>

    <?php // DBからデータ(投稿内容)を取得 
    $stmt = select(); 
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
                // 投稿内容を表示
                
                echo $message['time'],"：　",$message['name'],"：",$message['message'];
                echo nl2br("\n");
            }
 
            // 投稿内容を登録
            if(isset($_POST["send"])) {
                insert();
                // 投稿した内容を表示
                $stmt = select_new();
                foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
                    echo $message['time'],"：　",$message['name'],"：",$message['message'];
                    echo nl2br("\n");
                }
            }
 
            // DB接続
            function connectDB() {
                $user = "root";
                $pass = "root";
                $dbh = new PDO('mysql:host=localhost:3307;dbname=othello;charset=utf8', $user, $pass);

                return $dbh;
            }
 
            // DBから投稿内容を取得
            function select() {
                $dbh = connectDB();
                $sql = "SELECT * FROM message ORDER BY time";
                $stmt = $dbh->prepare($sql);
                $stmt->execute();
                return $stmt;
            }
 
            // DBから投稿内容を取得(最新の1件)
            function select_new() {
                $dbh = connectDB();
                $sql = "SELECT * FROM message ORDER BY time desc limit 1";
                $stmt = $dbh->prepare($sql);
                $stmt->execute();
                return $stmt;
            }
 
            // DBから投稿内容を登録
            function insert() {
                $dbh = connectDB();
                $sql = "INSERT INTO message (name, message, time) VALUES (:name, :message, now())";
                $stmt = $dbh->prepare($sql);
                $params = array(':name'=>$_POST['name'], ':message'=>$_POST['message']);
                $stmt->execute($params);
            }
        ?>
    </section>
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