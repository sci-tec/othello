<?php
  $newGET = [];
  foreach ($_GET as $key => $value) {
    $newGET[$key] = preg_replace('/[^0-9a-zA-Z]/', '', $value);
  }

  /*/
  sendByPHP($newGET); // mac
  /*/
  sendToNodeServer($newGET); // mac以外
  //*/

  function sendByPHP($newGETParams) {
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
    $tableId = $newGETParams["tableId"];
    $type = $newGETParams["type"];
    $pusher->trigger($tableId, $type, $newGETParams);
  }

  function sendToNodeServer($newGETParams) {
    $params = "?";
    foreach ($newGETParams as $key => $value) {
      $params .= $key."=".$value."&";
    }
    $url = "http://localhost:28887/sender".$params;
    $output = file_get_contents($url);
  }



?>