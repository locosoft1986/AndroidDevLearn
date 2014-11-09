<?php /* Smarty version Smarty3-b8, created on 2013-02-21 14:53:57
         compiled from "F:\androidphp\hush-framework\hush-app\tpl\backend\template\frame/page.tpl" */ ?>
<?php /*%%SmartyHeaderCode:166475125c4855d1d81-48936163%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f043c942fc835327567aa515499636dcdd1054da' => 
    array (
      0 => 'F:\\androidphp\\hush-framework\\hush-app\\tpl\\backend\\template\\frame/page.tpl',
      1 => 1357552552,
    ),
  ),
  'nocache_hash' => '166475125c4855d1d81-48936163',
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