<?php
    $cn = new mysqli("localhost","root","","sabuy_news");
    $frm = array(
        "0"=>"tbl_menu" ,
        "1"=>"tbl_news"
    );
    $opt = $_POST['opt'];
    $sql = "SELECT MAX(id) FROM ".$frm[$opt]."";
    $rs = $cn->query($sql);
    $row = $rs->fetch_array();
    $msg['id'] = $row[0];
    echo json_encode($msg);
?>