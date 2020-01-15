<?php
  require __DIR__ . '/vendor/autoload.php';
  $options = array(
    'cluster' => 'ap3',
    'useTLS' => true
  );
  $pusher = new Pusher\Pusher(
    'ac2b1faa8b9a8094de41',
    'd078b9ab01a564abf58f',
    '906718',
    $options
  );
  $tableId = $_GET["tableId"];
  $type = $_GET["type"];
  $pusher->trigger($tableId, $type, $_GET);
/*
/sender.php?tableId=t01&type=plot&x=5&y=3&color=0
*/
?>