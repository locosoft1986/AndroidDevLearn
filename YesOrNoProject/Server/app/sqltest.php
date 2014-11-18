<?php
require_once 'render.php';
require_once 'DBConnect.php';
   
$uname = 'locosoft';
	
$upassword = 'admin';
	

$con = DatabaseConnect();

	  

$sql="select * from customer where name=?";
$stmt = $con->prepare($sql);
$stmt->bind_param('s', $uname);
$stmt->execute();

$result = $stmt->get_result();


$arr = null;
while($row = $result->fetch_assoc())
{
    $arr= $row;
}


$result->free();
DatabaseClose($con);

if ($arr) {
	
        renderJson('10000', 'Get comment list ok', array(
                'Comment.list' => $arr //$arr = sets of { [index] => row_data}
        ));
}
 ?>
