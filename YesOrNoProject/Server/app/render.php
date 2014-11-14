<?php

function renderJson($code, $message, $result = '')
{

    if (is_array($result)) {
            foreach ((array) $result as $name => $data) {
                    // Object list
                    //if (strpos($name, '.list')) {
                    //        $model = trim(str_replace('.list', '', $name));
                            //foreach ((array) $data as $k => $v) {
                                    //$result[$name][$k] = $v;
                            //}
					//		$result[$model] = $data;
                    // Object
                    //} else {
                    $model = trim($name);
                    $result[$name] = $data;
                    //}
            }
    }
    // print json code
    $tmpJsonObj = json_encode(array(
            'code'	=> $code,
            'message'	=> $message,
            'result'	=> $result
    ));
    
    echo $tmpJsonObj;


    //DEBUG Purpose 
    //printf(" --------------------\n");
    //$tmpResultStr = var_dump(json_decode($tmpJsonObj, true));
    //echo $tmpResultStr;
    
    die();
}
?>
