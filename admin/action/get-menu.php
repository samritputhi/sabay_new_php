<?php
    $cn = new mysqli("localhost","root","","sabuy_news");
    $sql = "SELECT * FROM tbl_menu ORDER BY id DESC";
    $rs = $cn->query($sql);
    $data = array();
    while( $row = $rs->fetch_array() ){
        $data[] = array(
            'id'=>$row[0],
            'title'=>$row[1],
            'img'=>$row[2],
            'order'=>$row[3],
            'status'=>$row[4]
        );
    }
    echo json_encode($data);
?>