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
<meta name="viewport" content="width=device-width"/>
<link rel="stylesheet"  href="css/style.css">
<title>roomsearch</title>
</head>
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
  <script>
    const session_userId = <?php echo $userid; ?>;
    const session_userName = "<?php echo $username; ?>";
  </script>
  <script src="./js/app.js"></script>
  <script src="./js/roomsearch.js"></script>
  <link rel="shortcut icon" href="./faviconstc.ico" />
</head>
<body id="roomsearch_3">
    <div class="container">
        <div class="content">
            <h1>player: <?php echo $username; ?></h1>
            <div class="row">
                <input type="text" name="room" placeholder="ルーム名" class="room">
                <input class="makes" type="submit" name="send" value="make" >
            </div>
            <div class='text'></div>
            <div class="row">
            <input type="text" name="room" placeholder="ルーム名" class="room1">
                <a href="#" id = "search" class="search">search</a> 
            </div>
            <div class="roomContainer">

<?php // DBからデータ(投稿内容)を取得 
    //$stmt = select(); 
    require_once("./db.php");
    $items = getSQLResult("select * from rooms");
    foreach ($items->fetchAll(PDO::FETCH_ASSOC) as $rooms) {
        $item = '<div class="item row">'
        .'<div class="room2">'.$rooms['name'].'</div>'
        .'<form method="post" action="game.php"><input type="hidden" name="mycolor" value="0"><input type="hidden" name="roomname" value='.$rooms['name'].'><input type="hidden" name="roomid" value='.$rooms['id'].'><input class="myButton6 black" type="submit" value="black"></form>'
        .'<form method="post" action="game.php"><input type="hidden" name="mycolor" value="1"><input type="hidden" name="roomname" value='.$rooms['name'].'><input type="hidden" name="roomid" value='.$rooms['id'].'><input class="myButton6 white" type="submit" value="white"></form>'
        .'<form method="post" action="game.php"><input type="hidden" name="mycolor" value="2"><input type="hidden" name="roomname" value='.$rooms['name'].'><input type="hidden" name="roomid" value='.$rooms['id'].'><input class="myButton6 watching" type="submit" value="watching"></form>'
        .'</div>';
        echo $item;
    }
    // 投稿内容を登録
    if(isset($_POST["send"])) {
        insert();
    }
    // DBから投稿内容を登録
    function insert() {
        require_once("./db.php");
        $name = preg_replace('/[^0-9a-zA-Z]/', '', $_POST['room']);
        $sql = "insert INTO rooms (name,members) VALUES ('".$name."','')";
        execSQL($sql);
    }
?>
            </div>
        </div>
    </div>
</body>
</html>