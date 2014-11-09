<?php /* Smarty version Smarty3-b8, created on 2013-02-22 12:14:52
         compiled from "F:\androidphp\android-php-source\hush-framework\hush-app\tpl\backend\template\frame/page.tpl" */ ?>
<?php /*%%SmartyHeaderCode:324865126f0bccafae1-39061438%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '476546b3a3884c570ec459c52cf931601d9b7466' => 
    array (
      0 => 'F:\\androidphp\\android-php-source\\hush-framework\\hush-app\\tpl\\backend\\template\\frame/page.tpl',
      1 => 1357552552,
    ),
  ),
  'nocache_hash' => '324865126f0bccafae1-39061438',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_smarty_tpl->getVariable('paging')->value){?>
<div class="pagelist" style="float:right">
	<span>共 <?php echo $_smarty_tpl->getVariable('paging')->value['totalPage'];?>
 页 / <?php echo $_smarty_tpl->getVariable('paging')->value['totalNum'];?>
 条记录 </span><span class="indexPage"><?php echo $_smarty_tpl->getVariable('paging')->value['prevStr'];?>
</span><?php echo $_smarty_tpl->getVariable('paging')->value['pageStr'];?>
<span class="nextPage"><?php echo $_smarty_tpl->getVariable('paging')->value['nextStr'];?>
</span> 
</div>
<?php }?>