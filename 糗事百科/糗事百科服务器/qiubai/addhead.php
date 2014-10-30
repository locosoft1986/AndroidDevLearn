<?php
	$value = $_POST('value');
    $obj=json_decode($value);
	$id = $obj->id;
    $inputfile = $obj->img;
    $outputfile = "./qiubai/Userimg/".$obj->imgname . ".png";
	$file = fopen( $outputfile, "w" );  
    $fwflag = fwrite( $file, base64_decode( $inputfile ) );  
    fclose($file);  
    if ($fwflag > 0) {
    	  //把这条数据添加到图片数据库中去
    	$link = mysql_connect('localhost','root','root');
	mysql_select_db('mysql',$link);
        mysql_query('set names utf8');
	    $sql="UPDATE `quser` SET `UHEAD`= `".$obj->imgname."` WHERE `quser`.`userid`=".$id;
        $res = mysql_query($sql);
        printf("ok");
    }else{
    	printf("no");
    }