<?php
require_once 'render.php';
require_once 'UniversalConnect.php';

$uname = 'locosoft';
	
$upassword = 'admin';
	

$con = UniversalConnect::Instance()->doConnect();

	  

$sql="select * from customer where name=?";
$stmt = $con->prepare($sql);
$stmt->bind_param('s', $uname);
$stmt->execute();

$result = $stmt->get_result();
$result->num_rows;


$arr = null;
while($row = $result->fetch_assoc())
{
    $arr= $row;
}


$result->free();
	  
if ($arr) {
	
        renderJson('10000', 'Get comment list ok', array(
                'Comment.list' => $arr //$arr is a sets of { [index] => row_data}
        ));
}
 ?>
