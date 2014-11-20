<?php

require_once 'render.php';
require_once 'DBConnect.php';

$uphone = $_POST['phone'];
$con = DatabaseConnect();
$rowCount = 0;

//check if the user cell phone exists
$sql = "select * from `customer` where phonenum = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param('s', $uphone);
$stmt->execute();

$chkPhoneResult = $stmt->get_result();

if ($chkPhoneResult)
    $rowCount = mysqli_num_rows($chkPhoneResult);

$stmt->free_result();
DatabaseClose($con);

if ($rowCount === 1)
{
    
    //TODO:produce an sms code and send to the user
    $smsCode = "88888";
    $md5Code = md5($smsCode);
    renderJson('10000', $md5Code);
}
//phone number does not exist
else 
{
    renderJson('14001', "Phone number is not found");
}

