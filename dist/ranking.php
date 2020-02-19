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
    <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
  </head>
<body id="ranking">

<a href="index.php" class="circle_spread_btn">home</a>

<div class="maste-box">


      <span class="maste-tape">ランキング</span>

      <div class="maste-top">
      <div class =suuziwaku>

<?php
    function select()
    {
        require_once("./db.php");
        $dbh = getDBH();
        $sql = "SELECT * FROM users order by win DESC limit 10";
        $stmt = $dbh->prepare($sql); 
        $stmt->execute();
        return $stmt;
    }

    $stmt = select();
    $idx = 1;
foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $user) {
    // echo "<div class= profile><img src='../img/no_image.png' alt='icon' class = 'image'><div class='bubble'>" . $message['name'] . "：" . $message['message'] . ":" . $message['time'] . "</div></div>";
  echo '<div class="suuzi">'.$idx.'<span>位</span> '.$user["username"].' <span>戦</span>'.$user["count"].'<span> 勝</span>'.$user["win"].'<span> 負</span>'.$user["lose"].' </div>';
  $idx++;
}
?>
  
        </div>

        
        
         
       </div>
</div>
         
     
  
  



 
        
</body>
</html>