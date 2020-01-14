$(function(){

    $(".myButton").click(function() {
        let who = $(".waku").val()
        console.log(who);
        window.location.href = '/roomsearch.php?player='+who;
    })

});