$(function(){
  let player = session_userName;
  $('.makes').on('click',function(){//＋ボタンを押したとき
    var s = strDis($(".room").val())
    console.log(s)
    if( s!=""){//テキストボックス内に文字の有無
      let url = `./addroom.php?name=${s}`;
      console.log(url);
      $.get(url, function(data) {
        if (data != "success"){
          alert("再入力してください。すでに登録済みです( ﾟДﾟ)")
        } else {
          $(".room").attr('placeholder', 'ルーム名');
          location.reload(); // リロード
        }
      });
    }else{
     alert("文字を入力してください。")
    }
    $(".room").val("");//テキストボックス内を初期化
  })

  var tablesNew = [];
  var tableIdsNew = [];
  var items = $(".item");
  for (var i= 0; i < items.length; i++){
    var tn = $(items[i]).find(".room2").html();
    var tId = $(items[i]).find('input[name="roomid"]').val();
    tablesNew.push(tn);
    tableIdsNew.push(tId);
  }
  // console.log(tablesNew);
  // console.log(tableIdsNew);
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
            $(".roomContainer").append(getRowHTML(tablesNew[i], tableIdsNew[i]));
          }
        }
        $(".room1").val("");
  };
   $('#search').on('click', searchWord);
  // $('.room1').change(searchWord);
  function getRowHTML(value, id) {
    return `
    <div class="item row">
    <div class="room2" >${value}</div>
    <form method="post" action="game.php"><input type="hidden" name="mycolor" value="0"><input type="hidden" name="roomname" value="${value}"><input type="hidden" name="roomid" value="${id}"><input class="myButton6 black" type="submit" value="black"></form>
    <form method="post" action="game.php"><input type="hidden" name="mycolor" value="1"><input type="hidden" name="roomname" value="${value}"><input type="hidden" name="roomid" value="${id}"><input class="myButton6 white" type="submit" value="white"></form>
    <form method="post" action="game.php"><input type="hidden" name="mycolor" value="2"><input type="hidden" name="roomname" value="${value}"><input type="hidden" name="roomid" value="${id}"><input class="myButton6 watching" type="submit" value="watching"></form>
    </div>
    `
  }

});