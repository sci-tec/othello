$(function(){
  let tables = ["table001","table002","table003","table004","table005","table006","table007","table008","table009","table010"];
  let player = getUrlVars().player;
  $('#make').on('click',function(){//＋ボタンを押したとき
    var s = strDis($(".room").val())
    console.log(s)
    if( s!=""){//テキストボックス内に文字の有無
     tuika(s);
     refresh();
    }else{
     alert("文字を入力してください。")
    }
    $(".room").val("");//テキストボックス内を初期化
  })

function refresh() {
   console.log(tables);
  $(".roomContainer").html(""); // 文字を全消し
  for (var i=0; i<tables.length; i++){
    var make = `
    <div id = "item" class="row">
          <div class="room2">${tables[i]}</div>
          <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${0}" class="myButton6 black">black</a>
          <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${1}" class="myButton6 white">white</a>
          <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${-1}" class="myButton6 watching">watching</a>
      </div>`;
    console.log(make);
    $(".roomContainer").prepend(make);
  }
}

 function tuika(s){
   inputText = s;
   tables.push(inputText);
 }

  for (var i= 0; i < tables.length; i++){
      $(".roomContainer").append(`
      <div class="row">
          <div class="room2">${tables[i]}</div>
          <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${0}" class="myButton6 black">black</a>
          <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${1}" class="myButton6 white">white</a>
          <a href="./game.php?tableId=${tables[i]}&player=${player}&color=${-1}" class="myButton6 watching">watching</a>
      </div>`);
  }



  searchWord = function(){
      var searchResult,
          searchText = $(this).val,
          targetText;
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
  console.log(search-result_list)
});