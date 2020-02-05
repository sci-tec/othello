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
<meta charset="UTF-8">
<title>チャット</title>
<link rel="stylesheet"  href="./css/style.css">
</head>
<body id="game_chat">            
    <!-- header 表示固定表示 -->
    <div class="header">
        <p class="chat-str">チャット</p>
        <form method="post" action="chat.php">
            <div class="font">
<<<<<<< HEAD
                <div class="left"> 名前　   　　　<input type="text" name="name"　size="15" placeholder="名前を入力"> </div>
                <div class="right"> メッセージ    　<input type="text" name="message"　size="15" placeholder="メッセージ入力"></div>
=======
                <!-- <div class="left"> 名前　   　　　<input type="text" name="name"　size="15" placeholder="名前を入力"> </div> -->
                <input type="hidden" name="name" value="<?php echo $_SESSION["username"]; ?>">
                <div><?php echo $_SESSION["username"]; ?></div>
                <div class="right"><input type="text" name="message"　size="15" placeholder="メッセージ入力   Enterを押すと送信"></div>
>>>>>>> 60b3a959b9c84953f45674d6d171a5e2886680a9
            </div>
            <!-- <input class="send" name="send" type="submit" value="送信"> -->

            <input class="abc" type="submit" name="send" value="送信" >　

        </form>
        <!-- <p class="font">チャット履歴</p> -->
    </div>

    <!-- スクロール -->
    <div class="chat">
        <section>
<?php // DBからデータ(投稿内容)を取得 
    
    // 投稿内容を表示
    $stmt = select(); 
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
        echo "<div class= profile><img src='../img/no_image.png' alt='icon' class = 'image'><div class='bubble'>".$message['name']."：".$message['message'].":".$message['time']."</div></div>";
    }
 
<<<<<<< HEAD
            // DB接続
            function connectDB() {
                $user = "root";
                $pass = "root";
                $dbh = new PDO('mysql:host=localhost:8889;dbname=othello;charset=utf8', $user, $pass);
=======
    // 投稿内容を登録
    if(isset($_POST["send"])) {
        insert();
        // 投稿した内容を表示
        $stmt = select_new();
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
            echo "<div class= profile><img src='../img/no_image.png' alt='icon' class = 'image'><div class='bubble'>".$message['name']."：".$message['message'].":".$message['time']."</div></div>";
            // echo $message['time'],"：　",$message['name'],"：",$message['message'];
            echo nl2br("\n");
        }
    }
>>>>>>> 60b3a959b9c84953f45674d6d171a5e2886680a9


    // DB接続
    // function connectDB() {
    //     return new PDO('mysql:host='.$DB_HOST.';dbname='.$DB_NAME.';charset=utf8', $DB_USERNAME, $DB_PASSWORD);
    // }

    // DBから投稿内容を取得
    function select() {
        require_once("./db.php");
        $dbh = getDBH();
        $sql = "SELECT * FROM message ORDER BY time";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // DBから投稿内容を取得(最新の1件)
    function select_new() {
        require_once("./db.php");
        $dbh = getDBH();
        $sql = "SELECT * FROM message ORDER BY time desc limit 1";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // DBから投稿内容を登録
    function insert() {
        require_once("./db.php");
        $name = $_POST['name'];
        $message = $_POST['message'];
        // $userid = $_SESSION["userid"];
        // $roomid = $_SESSION["roomid"];
        $userid = 1;
        $roomid = 2;
        $sql = "insert INTO message (userid, roomid, name, message, time) VALUES (".$userid.", ".$roomid.", '".$name."', '".$message."', now())";
        execSQL($sql);
    }
?>
        </section>
    </div>
</body>
</html>