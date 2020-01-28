<?php
    // sessionの開始。既に開始されていれば再開します。
    session_start();
    if(isset($_GET["logout"])) {
        if($_GET["logout"]=="true") {
            session_destroy();
            session_start();
        }
    }

    $username = isset($_POST["username"]) ? $_POST["username"] : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";
    if(checkLogin($username, $password)) {
        $_SESSION['username'] = $username;
        echo $username;
        echo $password;
        header('Location: ./menu.php');
    }

    function checkLogin($u, $p) {
        //ここでdbアクセスをしてpwチェック
        // 今は単純に以下の条件でログインできるものとする
        // ユーザ名が空白ではなく
        // パスワード"123"
        return ($u != "" && $p == "123");
    }

?>
<!DOCTYPE html>
<html lang="ja">
<head><link rel="stylesheet"  href="style.css"></head>
<body>
    <h1>トップページ</h1>
    <?php if($username != "") echo "<div class='username'><span>".$username."</span>がログイン中</div>"; ?>
    <form method="post" action="./index.php">
        <input type="text" name="username" placeholder="username" value="<?php echo $username ?>">
        <input type="password" name="password" placeholder="password" value=""> pw: "123"
        <input type="submit" value="Login" >
    </form>
</body>
</html>