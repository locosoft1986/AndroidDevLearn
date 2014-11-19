<?php
require_once 'render.php';
require_once 'DBConnect.php';

$uname = $_POST['name'];
$upassword = $_POST['pass'];
$uphone = $_POST['phone'];

//$uname = 'testuser1';
//$upassword = 'password1';
//$uphone = '1223465642';

date_default_timezone_set("PRC");
$ctime = date("Y-m-d");//date("Y-m-d H:i:s");
$con = DatabaseConnect();
$rowCount = 0;

//check if the user name is already exists
$sql = "select * from `customer` where name = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param('s', $uname);
$stmt->execute();

$chkUserResult = $stmt->get_result();

if ($chkUserResult)
    $rowCount = mysqli_num_rows($chkUserResult);

$stmt->free_result();

if (!empty($rowCount))
{
    DatabaseClose($con);
    renderJson('14002', 'Signup failed,user name exists');
}

//check if the user cell phone is already exists
$sql = "select * from `customer` where phonenum = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param('s', $uphone);
$stmt->execute();

$chkPhoneResult = $stmt->get_result();

if ($chkPhoneResult)
    $rowCount = mysqli_num_rows($chkPhoneResult);

$stmt->free_result();

if (!empty($rowCount))
{
    DatabaseClose($con);
    renderJson('14003', 'Signup failed, phone number exists');
}


$sql = "INSERT INTO `customer` (`name`, `nickname`, `ctime`, `pass`, `phonenum`, `utype`) VALUES
        (?,?,?,?,?,0)";

$stmt = $con->prepare($sql);
$stmt->bind_param('sssss', $uname,$uname,$ctime,$upassword,$uphone);
$stmt->execute();

DatabaseClose($con);
renderJson('10000', 'Signup ok');



?>