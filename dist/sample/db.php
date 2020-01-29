<?php

    function getDBH() {
        require("./env_sample.php"); // 外部化した接続情報
        return new PDO('mysql:host='.$DB_HOST.';dbname='.$DB_NAME.';charset=utf8', $DB_USERNAME, $DB_PASSWORD);
    }

    // SQLを実行して結果を受け取る
    function getSQLResult($sql) {
        $stmt = getDBH()->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    // DBから投稿内容を登録
    function execSQL($sql) {
        $stmt = getDBH()->prepare($sql);
        $stmt->execute();
    }
?>
