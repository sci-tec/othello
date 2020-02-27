<?php
$name = preg_replace('/[^0-9a-zA-Z]/', '', $_GET['name']);

// $sql_select =  "select * from rooms where name='".$name."'";
$sql_select = "SET @d = ( SELECT id FROM rooms ORDER BY id DESC limit 28,1 ); DELETE FROM rooms WHERE id < @d; select * from rooms where name='".$name."';";
$sql_insert = "insert INTO rooms (name,members) VALUES ('".$name."','')";

require_once("./db.php");
$items = getSQLResult($sql_select);

if($items->rowCount() == 1) {
    echo "error";
} else {
    execSQL($sql_insert);
    echo "success";
}

?>
