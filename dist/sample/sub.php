<?php
    // sessionの開始。既に開始されていれば再開します。
    session_start();
    if(isset($_POST["username"])) {
        $_SESSION['username'] = $_POST["username"];
    }
    $username = $_SESSION['username'];
    if($username == "") {
        header('Location: ./index.php');
    }
?>
<!DOCTYPE html>
<html lang="ja">
<style>
div { 
    background-color: #0002;
    padding: 5px 10px;
    font-size: 20px;
}
span { color: #f00; }
</style>
<body>
    <h1>サブページ</h1>
    <?php if($username != "")  echo "<div><span>".$username."</span>がログイン中</div>"; ?>
    ログインしたままTOPページに行く場合は<a href="./index.php">こちら</a>をクリック<br>
    または<a href="./index.php?logout=true">ログアウト</a>する
</body>
</html>