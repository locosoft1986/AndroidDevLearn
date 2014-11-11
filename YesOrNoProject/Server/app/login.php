<?php

require_once 'render.php';

$value = $_POST['value'];
	  
$obj=json_decode($value);
	  
$uname = $obj->uname;
	
$upassword = $obj->upassword;
	
$link = mysql_connect('localhost','root','root');
	mysql_select_db('mysql',$link);
mysql_query('set names utf8');
	  
$mselect="select * from `quser` where uname = '".$uname."'";
  
$res = mysql_query($mselect);
   
$row   = mysql_num_rows($res); 
if(!empty($row)){

	$mselect="select * from `quser` where uname = '".$uname."' and upass = '".$upassword."'";
  
	$res = mysql_query($mselect);
   
	$row   = mysql_num_rows($res); 
	if(!empty($row)){
		$arr = array();
		 while($row = mysql_fetch_assoc($res)){
			$arr[] = $row;
		 }
		 renderJson('10000', 'Login ok', array(
					'Customer' => $arr
				));
	}
}

renderJson('14001', 'Login failed');

?>