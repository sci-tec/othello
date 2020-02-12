<?php
    // sessionの開始。既に開始されていれば再開します。
    session_start();
    $username = $_SESSION['username'];
    $userid = $_SESSION['userid'];
    if($username == "") {
        header('Location: ./index.php');
    }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<link rel="stylesheet"  href="css/style.css">
<title>roomsearch</title>
</head>
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
  <script src="./js/app.js"></script>
  <script src="./js/roomsearch.js"></script>
  <link rel="shortcut icon" href="./faviconstc.ico" />
</head>

<body id="roomsearch_3">
    <div class="container">
        <div class="content">
            <h1>player: <?php echo $username; ?></h1>
            <form method="post" action="roomsearch.php">
            <div class="row">
                <input type="text" name="room" placeholder="ルーム名" class="room">
                <input class="makes" type="submit" name="send" value="make" >
            </div>
            </form>
            <div class='text'></div>
            <div class="row">
                <input type="text" name="room" placeholder="ルーム名" class="room">
                <a href="#" class="search">search</a> 
            </div>
            <div class="roomContainer">
            
            
            <?php // DBからデータ(投稿内容)を取得 
    //$stmt = select(); 
    require_once("./db.php");
    $items = getSQLResult("select * from rooms");
    foreach ($items->fetchAll(PDO::FETCH_ASSOC) as $rooms) {
        $item = '<div id = "item" class="row">'
              . '<div class="room2">'.$rooms['name'].'</div>'
              . '<a href="./game.php?tableId='.$rooms['name'].'&player='.$userid.'&color=${0}" class="myButton6 black">black</a>'
              . '<a href="./game.php?tableId='.$rooms['name'].'&player='.$userid.'&color=${1}" class="myButton6 white">white</a>'
              . '<a href="./game.php?tableId='.$rooms['name'].'&player='.$userid.'&color=${-1}" class="myButton6 watching">watching</a>'
          . '</div>';
        echo $item;

    }
    
    // 投稿内容を登録
    if(isset($_POST["send"])) {
        insert();
    }


    // DB接続
    // function connectDB() {
    //     return new PDO('mysql:host='.$DB_HOST.';dbname='.$DB_NAME.';charset=utf8', $DB_USERNAME, $DB_PASSWORD);
    // }

    // // DBから投稿内容を取得
    // function select() {
    //     require_once("./db.php");
    //     $dbh = getDBH();
    //     $sql = "SELECT * FROM message ORDER BY time";
    //     $stmt = $dbh->prepare($sql);
    //     $stmt->execute();
    //     return $stmt;
    // }

    // // DBから投稿内容を取得(最新の1件)
    // function select_new() {
    //     require_once("./db.php");
    //     $dbh = getDBH();
    //     $sql = "SELECT * FROM message ORDER BY time desc limit 1";
    //     $stmt = $dbh->prepare($sql);
    //     $stmt->execute();
    //     return $stmt;
    // }

    // DBから投稿内容を登録
    function insert() {
        require_once("./db.php");
        $name = $_POST['room'];
        $sql = "insert INTO rooms (name,members) VALUES ('".$name."','')";
        execSQL($sql);
    }
?>
            </div>
        </div>
    </div>
</body>
</html>