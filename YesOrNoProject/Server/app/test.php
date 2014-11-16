<?php
require_once 'render.php';
   
$uname = 'locosoft';
	
$upassword = 'admin';
	

$con = mysqli_connect('localhost','root','', 'yonDB');

mysqli_query('set names utf8');

	  

$sql="select * from customer where name=?";
$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, 's', $uname);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);


$arr = null;
while($row = mysqli_fetch_assoc($result))
{
    $arr= $row;
}


mysqli_free_result($result);
	  
if ($arr) {
	
        renderJson('10000', 'Get comment list ok', array(
                'Comment.list' => $arr //$arr = sets of { [index] => row_data}
        ));
}
 ?>
