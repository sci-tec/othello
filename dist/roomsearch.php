<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<link rel="stylesheet"  href="css/style.css">
<title>roomsearch</title>
</head>
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script src="https://js.pusher.com/5.0/pusher.min.js"></script>
  <script src="./js/app.js"></script>
  <script src="./js/roomsearch.js"></script>
</head>

<body id="roomsearch_3">
<main>
    <div class="container">
        <div class="content">
            <h1>player: <?php echo $_GET["player"]; ?></h1>
            <div class="row">
                <input type="text" name="room" placeholder="ルーム名" class="room">
                <a href="#" id = "make" class="search">make</a> 
            </div>
            <div class='text'></div>
            <div class="row">
                <input type="text" name="room" placeholder="ルーム名" class="room">
                <a href="#" class="search">search</a> 
            </div>
            <div class="roomContainer"></div>
        </div>
    </div>
</main>
</body>
</html>