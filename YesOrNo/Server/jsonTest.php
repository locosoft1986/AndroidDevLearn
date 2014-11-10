<?php


$arr = array(
    array(
        "id"=>1,
        "name"=>"James"
    ),
    array(
        "id"=>2,
        "name"=>"Locosoft"
    )
    
);

$str = json_encode($arr);
echo "Array => JSON:".$str."\n";
echo "JSON => Array: ";
$arr2 = json_decode($str);
print_r($arr2);
        
?>

