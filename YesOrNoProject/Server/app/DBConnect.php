<?php
include_once('configDB.php');

//Using singleton mode to create the only one database link instance

    
function DatabaseConnect()
{

    $con=new mysqli(HOST,UNAME,PW, DBNAME);
    
    if($con)
    {
    //Remove slashes in following line for debugging
    //echo "Successful connection to MySQL:";
        $con->query('set names utf8');
    }
    /*elseif (mysqli_connect_error(self::$hookup))
    {
    echo('Here is why it failed: ' . mysqli_connect_error());
    }*/
    return $con;
}

function DatabaseClose($con)
{
    if ($con)
    {
        $con->close();
    }
}
