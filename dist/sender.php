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

  $newGET = [];
  foreach ($_GET as $key => $value) {
    $newGET[$key] = preg_replace('/[^0-9a-zA-Z]/', '', $value);
  }

  $tableId = $newGET["tableId"];
  $type = $newGET["type"];

  $pusher->trigger($tableId, $type, $newGET);
?>