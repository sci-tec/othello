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

    $userid = checkLogin($username, $password); 
    if($userid != null){
        $_SESSION['username'] = $username;
        $_SESSION['userid'] = $userid;
        echo $username;
        echo $password;
        echo $userid;
        header('Location: ./roomsearch.php');
    }

    function checkLogin($u, $p) {
        require_once("./db.php");
        $items = getSQLResult("select id from users where username='".$u."' and password='".$p."'");
        $rows = [];
        while($row = $items->fetch()){
            $rows[] = $row;
        }
        return $items->rowCount() == 1 ? $rows[0]["id"] : null;
    }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
<link rel="shortcut icon" href="./faviconstc.ico" />
<title>Horoaki othello | オンラインオセロ </title>
<link rel="stylesheet" href="css/style.css">
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
</head>
<body id="index">
    <p id="title" align="center"><font color ="white">Horoaki othello</font></p>

<div class="login">
    <form method="post" action="./index.php">
    <table align="center">
        <tr>
            <td><font color ="white">name</font></td>
            <td><input type="text" name="username" placeholder="username" class="waku" value="<?php echo $username ?>"></td>
        </tr>
        <tr>
            <td><font color ="white">password</font></td>
            <td><input type="password" name="password" placeholder="password" class="waku" value=""></td>
        </tr>
    </table>
        <div align="center">
          <input type="submit" value="Login" class="btn">
        </div>
    </form> 
    <div class="qrcode" align="center">
         <img src ="./img/qrcode.png">
        </div>
        <div align="center">
        <a href="./members.php" class="btn">members</a>
        </div>   
</div>

<div class="register">
    <table align="center">
        <tr>
            <td><font color ="white">name</font></td>
            <td><input type="text" name="name" class="waku"></td>
        </tr>
    </table>
        <div align="center">
          <input type="submit" value="register" class="myButton">
        </div>
    </div> 
         <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
    <script src="js/app.js"></script>
    <script src="js/index.js"></script>
</body>
</html>