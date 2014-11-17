<?php
include_once('IConnectInfo.php');

//Using singleton mode to create the only one database link instance
final class UniversalConnect implements IConnectInfo
{
    private static $server=IConnectInfo::HOST;
    private static $currentDB= IConnectInfo::DBNAME;
    private static $user= IConnectInfo::UNAME;
    private static $pass= IConnectInfo::PW;
    private static $hookup;
    
    private function __construct()
    {
        
    }
    
    public static function Instance()
    {
        static $inst = null;
        if ($inst === null)
        {
            $inst = new UniversalConnect();
        }
        return $inst;
    }
    
    public function doConnect()
    {
        if (self::$hookup)
        {
            return self::$hookup;
        }
        self::$hookup=new mysqli(self::$server,self::$user,self::$pass, self::$currentDB);
        
        if(self::$hookup)
        {
        //Remove slashes in following line for debugging
        //echo "Successful connection to MySQL:";
            self::$hookup->query('set names utf8');
        }
        /*elseif (mysqli_connect_error(self::$hookup))
        {
        echo('Here is why it failed: ' . mysqli_connect_error());
        }*/
        return self::$hookup;
    }
    
    public function closeConnect()
    {
        if (self::$hookup)
        {
            self::$hookup->close();
            self::$hookup = null;
        }
    }
}