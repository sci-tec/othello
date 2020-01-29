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
<head><link rel="stylesheet"  href="style.css"></head>
<body>
    <h1>サブページ</h1>
    <?php echo "<div class='username'><span>".$username."</span>がログイン中</div>"; ?>
    <h3>メニュー</h3>
    <ul>
        <li><a href="./index.php">トップページ</a></li>
        <li><a href="./addroom.php">ルーム登録</a></li>
        <li><a href="./index.php?logout=true">ログアウト</a></li>
    </ul>
</body>
</html>