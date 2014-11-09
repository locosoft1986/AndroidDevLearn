<?php /* Smarty version Smarty3-b8, created on 2013-02-22 11:56:00
         compiled from "F:\androidphp\android-php-source\hush-framework\hush-app\tpl\backend\template\frame/error.tpl" */ ?>
<?php /*%%SmartyHeaderCode:218585126ec50ef6327-08667445%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '175e42a283e8a00e5f604595a923e0afc8c3d974' => 
    array (
      0 => 'F:\\androidphp\\android-php-source\\hush-framework\\hush-app\\tpl\\backend\\template\\frame/error.tpl',
      1 => 1357552552,
    ),
  ),
  'nocache_hash' => '218585126ec50ef6327-08667445',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_smarty_tpl->getVariable('errors')->value){?>
	<div class="errorbox">
	<?php  $_smarty_tpl->tpl_vars['error'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('errors')->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
if (count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['error']->key => $_smarty_tpl->tpl_vars['error']->value){
?>
		<span><b>!</b> <?php echo $_smarty_tpl->getVariable('error')->value;?>
</span>
	<?php }} ?>
	</div>
<?php }?>