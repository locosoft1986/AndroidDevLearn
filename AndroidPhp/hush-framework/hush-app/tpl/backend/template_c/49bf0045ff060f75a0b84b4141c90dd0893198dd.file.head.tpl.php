<?php /* Smarty version Smarty3-b8, created on 2013-02-22 12:14:50
         compiled from "F:\androidphp\android-php-source\hush-framework\hush-app\tpl\backend\template\frame/head.tpl" */ ?>
<?php /*%%SmartyHeaderCode:256605126f0bab1fbc6-79167145%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '49bf0045ff060f75a0b84b4141c90dd0893198dd' => 
    array (
      0 => 'F:\\androidphp\\android-php-source\\hush-framework\\hush-app\\tpl\\backend\\template\\frame/head.tpl',
      1 => 1357552552,
    ),
  ),
  'nocache_hash' => '256605126f0bab1fbc6-79167145',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>iHush Tracking Console System</title>
<link href="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
css/main.css" rel="stylesheet" type="text/css" />
<link href="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
css/jquery.css" rel="stylesheet" type="text/css" />
<?php  $_smarty_tpl->tpl_vars['css'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('cssList')->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
if (count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['css']->key => $_smarty_tpl->tpl_vars['css']->value){
?><link href="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
<?php echo $_smarty_tpl->getVariable('css')->value;?>
" rel="stylesheet" type="text/css" />
<?php }} ?>
<script src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
js/json.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
js/string.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
js/jquery.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
js/jquery.ui.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
js/ihush.js" language="javascript" type="text/javascript"></script>
<?php  $_smarty_tpl->tpl_vars['js'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('jsList')->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
if (count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['js']->key => $_smarty_tpl->tpl_vars['js']->value){
?><script src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
<?php echo $_smarty_tpl->getVariable('js')->value;?>
" language="javascript" type="text/javascript"></script>
<?php }} ?>
</head>

<body>

<div class="main">
