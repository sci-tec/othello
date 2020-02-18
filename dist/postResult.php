<?php
// $winnerid = preg_replace('/[^0-9a-zA-Z]/', '', $_POST['winnerid']);
// $loserid = preg_replace('/[^0-9a-zA-Z]/', '', $_POST['loserid']);
$winnerid = preg_replace('/[^0-9a-zA-Z]/', '', $_POST['winnerid']);
$loserid = preg_replace('/[^0-9a-zA-Z]/', '', $_POST['loserid']);

$sql_winner =  "update users SET win=win+1, count=count+1 where id = '".$winnerid."'";
$sql_loser =  "update users SET lose=lose+1, count=count+1 where id = '".$loserid."'";

require_once("./db.php");
execSQL($sql_winner);
execSQL($sql_loser);

return "success";

?>
