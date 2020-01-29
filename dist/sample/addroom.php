<?php
    // sessionの開始。既に開始されていれば再開します。
    session_start();
    $username = $_SESSION['username'];
    if($username == "") {
        header('Location: ./index.php');
    }
?>
<?php
    $type = isset($_POST["type"]) ? $_POST["type"] : "";
    $tableId = isset($_POST["tableId"]) ? $_POST["tableId"] : "";

    require_once("./db.php");
    if($type=="add") {
        $sql = "insert into message (name, message, time) values ('".$username."', '".$tableId."', now())";
        execSQL($sql);
    }
    $items = getSQLResult("select * from message order by time desc");
?>
<!DOCTYPE html>
<html lang="ja">
<head><link rel="stylesheet"  href="style.css"></head>
<body>
    <h1>DBへ追加</h1>
    <?php echo "<div class='username'><span>".$username."</span>がログイン中</div>"; ?>
    <h3>メニュー</h3>
    <ul>
        <li><a href="./menu.php">メニュー</a></li>
        <li><a href="./index.php?logout=true">ログアウト</a></li>
    </ul>

    <div class="form">
        <form method="post" action="./addroom.php">
            <input type="hidden" name="type" value="add">
            <input type="text" name="tableId" placeholder="table001" >
            <input type="submit" value="Add" >
        </form>
    </div>

    <div class="list">
    <?php
        foreach ($items->fetchAll(PDO::FETCH_ASSOC) as $item) {
            echo "<div>[".$item['time']."] ".$item['name'].":「".$item['message']."」</div>";
        }
    ?>
    </div>

</body>
</html>