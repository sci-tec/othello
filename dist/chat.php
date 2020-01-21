<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>チャット</title>
<link rel="stylesheet"  href="./css/style.css">
</head>
<body id="game_chat">            
    <div id="gamechatto" align="center">
    <div class="font">チャット</div>
        <form method="post" action="chat.php">
       <div class="font"> 名前　　　　<input type="text" name="name"　size="25" placeholder="名前を入力"> </div>
       <div class="font"> メッセージ　<input type="text" name="message"　size="25" placeholder="メッセージ入力"></div>
       
 
        <button class="send" name="send" type="submit">送信</button>
 
        <p class="font">チャット履歴</p>
        <div class="chat">

        <section>
    </form>
</body>

    <?php // DBからデータ(投稿内容)を取得 
    $stmt = select(); 
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
                // 投稿内容を表示
                $who = rand(1, 100) > 50 ? "me" : "you"; 
                echo '<img src="../img/no_image.png" alt="icon" class = image />';
                echo "<div class='bubble '".$who."'>".$message['name'],"：　",$message['message'],"：",$message['time']."</div>";
            }
 
            // 投稿内容を登録
            if(isset($_POST["send"])) {
                insert();
                // 投稿した内容を表示
                $stmt = select_new();
                foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $message) {
                    echo "<div class='bubble me'>".$message['name'],"：　",$message['message'],"：",$message['time']."</div>";
                    // echo $message['time'],"：　",$message['name'],"：",$message['message'];
                    echo nl2br("\n");
                }
            }
 
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
</body>
</html>