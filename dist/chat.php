<?php
    // sessionの開始。既に開始されていれば再開します。
    session_start();
    $username = $_SESSION['username'];
    $userid = $_SESSION['userid'];
    if(isset($_GET['roomid'])) {
        $_SESSION['roomid'] = preg_replace('/[^0-9a-zA-Z]/', '', $_GET['roomid']);
    }
    if(isset($_GET['mycolor'])) {
        $_SESSION['mycolor'] = preg_replace('/[^0-9a-zA-Z]/', '', $_GET['mycolor']);
    }
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
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://js.pusher.com/5.0/pusher.min.js"></script>
</head>
<body id="game_chat">
    <!-- header 表示固定表示 -->
    <div class="header">
        <p class="chat-str">チャット</p>
        <form method="post" action="chat.php">
            <div class="font">
                <input type="hidden" name="name" value="<?php echo $username; ?>">
                <input type="hidden" name="userid" value="<?php echo $userid; ?>">
                <input type="hidden" name="roomid" value="<?php echo $roomid; ?>">
                <input type="hidden" name="mycolor" value="<?php echo $mycolor; ?>">
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
    
    // 投稿内容を登録
    if(isset($_POST["send"])) {
        insert();
    }

    // 投稿内容を表示
    $stmt = select(); 
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
        $name = $message['name'];
        echo "<div class= profile><img src='./img/no_image.png' alt='icon' class = 'image'><div class='bubble'>".$name."：".$message['message']."</div></div>";
    }
 
    // DBから投稿内容を取得
    function select() {
        require_once("./db.php");
        $dbh = getDBH();
        $roomid = $_SESSION["roomid"];
        $sql = "SET @d = ( SELECT id FROM message where roomid = '".$roomid."' ORDER BY id DESC limit 300,1 ); DELETE FROM message WHERE id < @d;";
        execSQL($sql);
        $sql = "select * FROM message where roomid = '".$roomid."' order by id desc";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
    // DBから投稿内容を登録
    function insert() {
        require_once("./db.php");
        $userid = $_SESSION["userid"];
        $roomid = preg_replace('/[^0-9a-zA-Z]/', '', $_SESSION['roomid']);
        $username = $_SESSION["username"];
        $message = preg_replace("/[^ぁ-んァ-ヶーa-zA-Z0-9一-龠０-９ａ-ｚＡ-Ｚ！？、。\n\r]/u", '', $_POST['message']);
        // $message = htmlspecialchars($_POST['message'], ENT_QUOTES);
        
        $sql = "insert INTO message ( roomid, userid, message, name) VALUES ('".$roomid."', '".$userid."', '".$message."', '".$username."')";
        // echo $sql; exit;
        execSQL($sql);

// jsを即時実行
echo <<<EOM
<script>
    let url = `./sender.php?tableId=$roomid&type=chat&userid=$userid`;
    $.get(url, function(_, status) {
        if (status != "success") console.log("送信エラー");
    });
</script>
EOM;

    }
?>
        </section>
    </div>
    <script src="js/app.js"></script>
    <script>
        $(function(){
            $("#navi").html("");
            let roomid = strDis("<?php echo $_SESSION['roomid']; ?>");
            pusher.subscribe(roomid).bind("chat", function(data) {
                let userid = <?php echo $userid ?>;
                if(data.userid != <?php echo $userid ?>) {
                    window.location.href = './chat.php';
                }
            });
        });
    </script>
</body>
</html>