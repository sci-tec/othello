<?php
foreach($_POST as $key => $value) {
    $k = preg_replace('/[^0-9a-zA-Z]/', '', $key);
    $v = preg_replace('/[^0-9a-zA-Z]/', '', $value);
    $SESSION[$k] = $v;
}
?>
