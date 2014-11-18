<?php
require_once 'render.php';
require_once 'DBConnect.php';
 
$uname = $_POST['name'];	
$upassword = $_POST['pass'];
//$uname = 'locosoft';
//$upassword = 'admin';
	
$con = DatabaseConnect();
	  
$sql = "select * from `customer` where name = ?";
  
$stmt = $con->prepare($sql);
$stmt->bind_param('s', $uname);
$stmt->execute();

$result = $stmt->get_result();

  
if($result && !empty($result->num_rows)){
	$sql="select * from `customer` where name = ? and pass = ?";
  
	$stmt = $con->prepare($sql);
	$stmt->bind_param('ss', $uname, $upassword);
	$stmt->execute();
   
	$res = $stmt->get_result();
	
	if($res && !empty($res->num_rows)){
		$arr = null;
		 while($row = $res->fetch_assoc()){
			$arr = $row;
		 }
		 DatabaseClose($con);
		 renderJson('10000', 'Login ok', array(
					'Customer' => $arr
				));
	}
}
DatabaseClose($con);
renderJson('14001', 'Login failed');
?>