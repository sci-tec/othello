$(function(){
    $(".myButton").click(function() {
        let who = $(".waku").val()
        console.log(who);
        window.location.href = '/roomsearch.php?player='+who;
    });
    
        // console.log("test"); 
        /* $(".myButton5").click(function(){
             console.log("test2"); 
             window.location.href = '/game.php?tableId=table001';
         })*/
    
});