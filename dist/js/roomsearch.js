$(function(){
  let player = session_userName;
  $('#make').on('click',function(){//＋ボタンを押したとき
    var s = strDis($(".room").val())
    console.log(s)
    if( s=""){//テキストボックス内に文字の有無
     alert("文字を入力してください。")
    }
  })
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
            $(".roomContainer").append(getRowHTML(tablesNew[i]));
          }
        }
        $(".room1").val("");
  };
   $('#search').on('click', searchWord);
  // $('.room1').change(searchWord);
  function getRowHTML(value) {
    return `
    <div class="item row">
      <div class="room2">${value}</div>
      <a href="./game.php?tableId=${value}&player=${player}&color=0" class="myButton6 black">black</a>
      <a href="./game.php?tableId=${value}&player=${player}&color=1" class="myButton6 white">white</a>
      <a href="./game.php?tableId=${value}&player=${player}&color=-1" class="myButton6 watching">watching</a>
    </div>`
  }
});