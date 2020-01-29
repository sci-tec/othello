<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" />
    <title>othello</title>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <link rel="shortcut icon" href="./faviconstc.ico" />
    <link rel="stylesheet" href="css/style.css">
</head>

<body id="matching_test">
    <script src="https://js.pusher.com/5.0/pusher.min.js"></script>

    <script src="js/app.js"></script>

    <script src="js/matching_test.js"></script>

    <style>
        .block {
            margin: 15px;
        }
    </style>
    <div style="margin-top: 50px; background-color: #0003; padding: 15px; width: auto">
        <h2>TableId: <?php echo $_GET["tableId"]; ?></h2>
        <div id="player1" class="block">
            <div>Player1: <span class="name"></span> ID:<span class="playerId"></span></div>
        </div>
        <div id="player2" class="block">
            <div>Player2: <span class="name"></span> ID:<span class="playerId"></span></div>
        </div>
        <div id="audience" class="block">
            <div>観客</div>
            <div class="container"></div>
        </div>
    </div>
    
</body>

</html>