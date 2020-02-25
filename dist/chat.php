<?php
    // sessionの開始。既に開始されていれば再開します。
    session_start();
    $username = $_SESSION['username'];
    $userid = $_SESSION['userid'];
    $_SESSION['roomid'] = preg_replace('/[^0-9a-zA-Z]/', '', $_GET['roomid']);
    $_SESSION['mycolor'] = preg_replace('/[^0-9a-zA-Z]/', '', $_GET['mycolor']);
    $roomid = $_SESSION["roomid"];

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
                <input type="hidden" name="name" value="<?php echo $username; ?>">
                <input type="hidden" name="userid" value="<?php echo $userid; ?>">
                <div><?php echo $username; ?></div>
                <div class="right"><input type="text" name="message"　size="15" placeholder="メッセージ入力   Enterを押すと送信"></div>
                <div class ="abcd"> <input class="abc" type="submit" name="send" value="送信" > </div>
            </div>
            　
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
        $name = $message['name'];
        echo "<div class= profile><img src='../img/no_image.png' alt='icon' class = 'image'><div class='bubble'>".$name."：".$message['message']."</div></div>";
    }
 
    // 投稿内容を登録
    if(isset($_POST["send"])) {
        insert();
        // 投稿した内容を表示
        $stmt = select_new();
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
            $name = $message['name'];
            echo "<div class= profile><img src='../img/no_image.png' alt='icon' class = 'image'><div class='bubble'>".$name."：".$message['message']."</div></div>";
        }
    }
    // DBから投稿内容を取得
    function select() {
        require_once("./db.php");
        $dbh = getDBH();
        $roomid = $_SESSION["roomid"];
        $sql = "select * FROM message where roomid = '".$roomid."'";
        // $sql = "select * FROM message where roomid = '2'";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    // DBから投稿内容を取得(最新の1件)
    function select_new() {
        require_once("./db.php");
        $dbh = getDBH();
        // $sql = "SELECT * FROM message ORDER BY time desc limit 1";
        $sql = "SELECT * FROM message ORDER BY id desc limit 1";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    // DBから投稿内容を登録
    function insert() {
        require_once("./db.php");
        $message = preg_replace('/[^0-9a-zA-Z]/', '', $_POST['message']);
        $sql = "insert INTO message ( roomid, userid, message, name) VALUES ('".$roomid."', '".$userid."', '".$message."', '".$username."')";
        // echo $sql; exit;
        execSQL($sql);
    }
?>
        </section>
    </div>
</body>
</html>