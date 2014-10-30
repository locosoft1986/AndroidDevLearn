<?php

     $valuer = $_POST['value'];
    $inputfile = $_POST['img'];
    $obj=json_decode($valuer);
    $uid = $obj->uid;
	$tid = $obj->tid;
	$qimg = $obj->qimg;
	$qvalue = $obj->qvalue;
	$qlike = $obj->qlike;
	$qunlike = $obj->qunlike;
	if(!empty($qimg)){
 $file = fopen("./Valueimg/".$qimg , "w");  	  
         $fwflag = fwrite( $file, base64_decode( $inputfile ) );  
         fclose($file);  
	}
	$link = mysql_connect('localhost','root','root');
	mysql_select_db('mysql',$link);
    mysql_query('set names utf8');
	$sql="INSERT INTO `qvalue`( UID, TID, QIMG, QVALUE, QLIKE, QUNLIKE,QSHARE) VALUES (".$uid.",".$tid.",'".$qimg."','".$qvalue."','".$qlike."','".$qunlike."','0');";
    $res = mysql_query($sql);
    printf("ok");