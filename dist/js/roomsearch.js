$(function(){
  let tables = [];
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

  var tablesNew = [];
  var items = $(".item");
  for (var i= 0; i < items.length; i++){
    var tn = $(items[i]).find(".room2").html();
    tablesNew.push(tn);
  }
  console.log(tablesNew);

  searchWord = function(){
      var searchText = strDis($(".room1").val())
      var targetText;
      var tester;
          console.log(searchText);
          $(".roomContainer").html("");
        for (var i= 0; i < tablesNew.length; i++){
          targetText = searchText;
          tester = new RegExp(targetText);
          if(tester.test(tablesNew[i]) || searchText =='' ){
          $(".roomContainer").append(`
          <div class="item row">
              <div class="room2">${tablesNew[i]}</div>
              <a href="./game.php?tableId=${tablesNew[i]}&player=${player}&color=${0}" class="myButton6 black">black</a>
              <a href="./game.php?tableId=${tablesNew[i]}&player=${player}&color=${1}" class="myButton6 white">white</a>
              <a href="./game.php?tableId=${tablesNew[i]}&player=${player}&color=${-1}" class="myButton6 watching">watching</a>
          </div>`);}
        }
        $(".room1").val("");
  };
   $('#search').on('click', searchWord);
  // $('.room1').change(searchWord);
});