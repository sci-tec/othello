
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<link rel="stylesheet"  href="css/style.css">
<title>タイトル3</title>
</head>
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script src="./js/app.js"></script>
</head>

<body id="roomsearch_3">
<main>
    <div class="container">
        <div class="content">

        <h1>player: <?php echo $_GET["player"]; ?></h1>

        
    <div class="row">
        <input type="text" name="room" placeholder="ルーム名" class="room">
        <a href="#" class="search">検 索</a> 
    </div>

    <div class="roomContainer"></div>

    </div>
    </div>
</main>

<script>
let tables = ["table001","table002","table003","table004","table005"];
$(function(){

    let player = getUrlVars().player;

    for (var i= 0; i < tables.length; i++){
        $(".roomContainer").append(`
        <div class="row">
            <div class="room2">${tables[i]}</div>
            <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${0}" class="myButton5">black</a>
            <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${1}" class="myButton5">white</a>
            <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${-1}" class="myButton5">watching</a>
        </div>`);
    
    }



    searchWord = function(){
        var searchResult,
            searchText = $(this).val,
            targetText,
            hitNum;
       
        room2 = [];
        $('#search-result_list').empty();
        $('.search-result_hit-num').empty();
        
        if (searchText !='') {
          $('.target-area .roomContainer').each(function(){
              targetText = $(this).text();

              if (targetText.index0f(searchText)!= -1){
                  searchResult.push(targetText);
              }
          });
          for (var i= 0; i < searchResult.length; i++){
              $('<span>').text(searchResult[i]).appendTo('search-result_list');
          }
        };
    };
    $('#search-text').on('input',searchWord);
});

</script>
<script
src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js">
</script>
<script
src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js">
</script>



</body>
</html>