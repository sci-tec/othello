<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
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

  $data['message'] = 'hello world';
  $pusher->trigger('my-channel', 'my-event', $data);
?>

</body>
</html>