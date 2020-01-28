<?php
    // sessionの開始。既に開始されていれば再開します。
    session_start();
    if(isset($_GET["logout"])) {
        if($_GET["logout"]=="true") {
            $_SESSION['username'] = "";
        }
    }
    $username = $_SESSION['username'];
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
    <h1>トップページ</h1>
    <?php if($username != "")  echo "<div><span>".$username."</span>がログイン中</div>"; ?>
    <form method="post" action="./sub.php">
        <input type="text" name="username" value="<?php echo $username ?>">
        <input type="submit" value="Login" >
    </form>
</body>
</html>