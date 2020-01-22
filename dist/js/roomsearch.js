var items = []
var e=0; 
 
  $(function(){
     $('#make').on('click',function(){//＋ボタンを押したとき
       if( $(".room").val()!=""){//テキストボックス内に文字の有無
        tuika();
        refresh();
       }else{
        alert("文字を入力してください。")
       }
       $(".room").val("");//テキストボックス内を初期化
     })

     $(document).on("change", ".check", function () {
      var id = $(this).parent().data("id");
      var isChecked = $(this).filter(":checked").val()=="on";
      setChecked(id,isChecked);
      });


    //console.log(id, isChecked);
    //console.log(setChecked(id, isChecked));

      //消去
    $(document).on("click", ".batu", function () {
      var itemId = $(this).data("id");
      for(var i = 0 ; i<items.length; i++){
        if(items[i].id == itemId) items.splice(i,1);
      }
      refresh();
  });

     
    $(document).on("click",'.label', function () {
      if($(this).find("input").attr("type") !="text"){
        $(this).html('<input class=tuikaa type="text" value="'+ $(this).html()+'" />');
      }
    });
 
    $(document).on("keydown",'.tuikaa', function (e) {
      if(e.keyCode==13){
         if( $(this).val()=="") {
             $(this).parent().parent().remove()
         }else{
             var taks=$(this).val();
             $(this).parent().html(taks);//親要要素の場所に　
         }
      }
    });
  });

 
 
  function refresh() {
      console.log(items);
     $(".text").html(""); // 文字を全消し
     for (var i=0; i<items.length; i++){
       var color = items[i].checked ? "#f55": "#eee"; // 三項演算子
       var checked = items[i].checked ? "checked" : "";

       var item = `
       <div class="item" data-id="${items[i].id}" style="background-color: ${color}">
         <input class="check" type="checkbox" ${checked}>
         <span class="id">ID:${items[i].id}</span>
         <div class="label">${items[i].text}</div>
         <button class="batu" data-id="${items[i].id}">削除</button>
       </div>`;
       console.log(item);
       //$.datetimepicker.setLocale('ja');//カレンダー日本語化
       //$("#datetimepicker").datetimepicker();カレンダーのデータを取得し、datetimepickerIDに追加
       $(".text").append(item);
     }
  }

    function tuika(){
      inputText = $(".room").val();
      items.push({id:e,text:inputText,checked:""});
      e++;
    }

    function setChecked(a, b){
      for(var i = 0 ; i<items.length; i++){
        if(items[i].id == a) 
         items[i].checked = b;
        }
        refresh();
    }
    




$(function(){
    let tables = ["table001","table002","table003","table004","table005","table006","table007","table008","table009","table010"];
    let player = getUrlVars().player;

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
