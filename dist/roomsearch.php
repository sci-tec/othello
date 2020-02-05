<?php
    // sessionの開始。既に開始されていれば再開します。
    session_start();
    $username = $_SESSION['username'];
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
<main>
    <div class="container">
        <div class="content">
            <h1>player: <?php echo $username; ?></h1>
            <div class="row">
                <input type="text" name="room" placeholder="ルーム名" class="room">
                <a href="#" id = "make" class="search">make</a> 
            </div>
            <div class='text'></div>
            <div class="row">
                <input type="text" name="room" placeholder="ルーム名" class="room">
                <a href="#" class="search">search</a> 
            </div>
            <div class="roomContainer">
            
            
            <?php // DBからデータ(投稿内容)を取得 
    $stmt = select(); 
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
        $item = '<div id = "item" class="row">'
              . '<div class="room2">${tables[i]}</div>'
              . '<a href="./game.php?tableId=${tables[i]}&player=${player}&color=${0}" class="myButton6 black">black</a>'
              . '<a href="./game.php?tableId=${tables[i]}&player=${player}&color=${1}" class="myButton6 white">white</a>'
              . '<a href="./game.php?tableId=${tables[i]}&player=${player}&color=${-1}" class="myButton6 watching">watching</a>'
          . '</div>';
        echo $item;

    }

    // // 投稿内容を登録
    // if(isset($_POST["send"])) {
    //     insert();
    //     // 投稿した内容を表示
    //     $stmt = select_new();
    //     foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
    //         echo "<div class= profile><img src='../img/no_image.png' alt='icon' class = 'image'><div class='bubble'>".$message['name']."：".$message['message'].":".$message['time']."</div></div>";
    //         // echo $message['time'],"：　",$message['name'],"：",$message['message'];
    //         echo nl2br("\n");
    //     }
    // }

    // DB接続
    function connectDB() {
        $user = "root";
        $pass = "root";
        $dbh = new PDO('mysql:host=localhost:8889;dbname=othello;charset=utf8', $user, $pass);

        return $dbh;
    }

    // DBから投稿内容を取得
    function select() {
        $dbh = connectDB();
        $sql = "SELECT * FROM rooms ORDER BY id";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // // DBから投稿内容を取得(最新の1件)
    // function select_new() {
    //     $dbh = connectDB();
    //     $sql = "SELECT * FROM message ORDER BY time desc limit 1";
    //     $stmt = $dbh->prepare($sql);
    //     $stmt->execute();
    //     return $stmt;
    // }

    // // DBから投稿内容を登録
    // function insert() {
    //     $dbh = connectDB();
    //     $sql = "INSERT INTO message (name, message, time) VALUES (:name, :message, now())";
    //     $stmt = $dbh->prepare($sql);
    //     $params = array(':name'=>$_POST['name'], ':message'=>$_POST['message']);
    //     $stmt->execute($params);
    // }
?>            
            
            
            </div>
        </div>
    </div>
</main>
</body>
</html>