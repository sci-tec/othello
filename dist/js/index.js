$(function(){
    $(".myButton").click(function() {
        let who = $(".waku").val()
        console.log(who);
        window.location.href = './roomsearch.php?player='+who;
    });
    $("body").keypress(function(e) {
        if (e.which === 13) {
            if($(".waku").val() === '') {
                alert('名前を入力してください！');
                $(".waku").focus();
                return false;
            } else{
                $(".myButton").click();
            } 
        }
    });
});