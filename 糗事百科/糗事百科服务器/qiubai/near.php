<?php 
	 $mstart = $_GET['start'];
	 $mend = $_GET['end'];
	 $link = mysql_connect('localhost','root','root');
	mysql_select_db('mysql',$link);
	 mysql_query('set names utf8');
     $sql = "SELECT `USERID`, `UNAME`, `UHEAD`, `UAGE`, `UHOBBIES`, `UPLACE`, `UEXPLAIN`, `UTIME`, `UBRAND`, `USEX` FROM `quser` limit ".$mstart.",5";
	 $res = mysql_query($sql);
	 $arr = array();
	 while($row = mysql_fetch_assoc($res)){
			$arr[] = $row;
	 }
	 die(json_encode($arr));


