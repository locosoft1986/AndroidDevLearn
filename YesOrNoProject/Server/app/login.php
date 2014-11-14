<?php
require_once 'render.php';
 
$uname = $_POST['name'];	
$upassword = $_POST['pass'];
	
$link = mysql_connect('localhost','root','');
mysql_select_db('yonDB',$link);
mysql_query('set names utf8');
	  
$mselect="select * from `customer` where name = '".$uname."'";
  
$res = mysql_query($mselect);
  
$row   = mysql_num_rows($res); 
if(!empty($row)){
	$mselect="select * from `customer` where name = '".$uname."' and pass = '".$upassword."'";
  
	$res = mysql_query($mselect);
   
	$row   = mysql_num_rows($res); 
	if(!empty($row)){
		$arr;
		 while($row = mysql_fetch_assoc($res)){
			$arr = $row;
		 }
		 renderJson('10000', 'Login ok', array(
					'Customer' => $arr
				));
	}
}
renderJson('14001', 'Login failed');
?>