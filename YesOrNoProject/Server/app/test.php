<?php
require_once 'render.php';
	  
$obj=json_decode($value);
	  
$uname = 'locosoft';
	
$upassword = 'admin';
	
$link = mysql_connect('localhost','root','');
mysql_select_db('yonDB',$link);
mysql_query('set names utf8');
	  
$mselect="select * from `quser`";
  
$res = mysql_query($mselect);
    
$arr = array();

while($row = mysql_fetch_assoc($res))
{
	array_push($arr, $row);

}
	  
if ($arr) {
	
        renderJson('10000', 'Get comment list ok', array(
                'Comment.list' => $arr //$arr = sets of { [index] => row_data}
        ));
}

 ?>
