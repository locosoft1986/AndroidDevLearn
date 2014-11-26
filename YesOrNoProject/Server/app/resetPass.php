<?php
require_once 'render.php';
require_once 'DBConnect.php';

$uphone = $_POST['phone'];
$upassword = $_POST['pass'];

$con = DatabaseConnect();
 
$sql = "update `customer` set pass=? where phonenum=?";

$stmt = $con->prepare($sql);
$stmt->bind_param('ss', $upassword, $uphone);

if($stmt->execute())
{
    DatabaseClose($con);
    renderJson('10000', 'Reset Pass OK');
}


DatabaseClose($con);
renderJson('14001', 'Reset Pass Failed');

?>