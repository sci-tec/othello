
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<link rel="stylesheet"  href="css/style.css">
<title>タイトル3</title>
<script src="./js/app.js"></script>
</head>
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
</head>

<body id="roomsearch_3">
<main>
    <div class="container">
        <div class="content">

        <h1><font color="white">player: <?php echo $_GET["player"]; ?></font></h1>

        
    <div class="row">
        <input type="text" name="room" placeholder="ルーム名" class="room">
        <a href="#" class="search">検 索</a> 
    </div>
    <div class="row">
        <div class="room2">ルーム名</div>
        <button href="#" class="myButton5">入る</button>
    </div>
    </div>
    </div>
    <div><a href="game.php?tableId=table001">start (tableid: table001)</a></div>
    <div><a href="game.php?tableId=table002">start (tableid: table002)</a></div>
</main>

<script src="js/app.js"></script>
<script src="js/index.js"></script>
<script src="js/roomsearch.js"></script>
</body>
</html>