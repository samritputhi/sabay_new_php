<?php

    $cn = new mysqli("localhost","root","","sabuy_news");
    $title = $_POST['txt-title'];
    $img = $_POST['txt-img-name']; 
    $order = $_POST['txt-order'];
    $status = $_POST['txt-status'];
    $sql = "INSERT INTO tbl_menu VALUES(null ,'$title', '$img' , $order , $status )";
    $cn->query($sql);

    $msg['id'] = $cn->insert_id;
    echo json_encode($msg);
    
?>