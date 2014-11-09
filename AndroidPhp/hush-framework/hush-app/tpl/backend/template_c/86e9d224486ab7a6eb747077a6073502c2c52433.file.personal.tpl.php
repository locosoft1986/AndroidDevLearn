<?php /* Smarty version Smarty3-b8, created on 2013-02-21 14:54:13
         compiled from "F:\androidphp\hush-framework\hush-app\tpl\backend\template\common\personal.tpl" */ ?>
<?php /*%%SmartyHeaderCode:251455125c49594db89-99609755%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '86e9d224486ab7a6eb747077a6073502c2c52433' => 
    array (
      0 => 'F:\\androidphp\\hush-framework\\hush-app\\tpl\\backend\\template\\common\\personal.tpl',
      1 => 1357552552,
    ),
  ),
  'nocache_hash' => '251455125c49594db89-99609755',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<?php $_template = new Smarty_Internal_Template("frame/head.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>


<div class="maintop">
<img src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
img/icon_arrow_right.png" class="icon" /> 个人信息修改
</div>

<div class="mainbox">

<?php $_template = new Smarty_Internal_Template("frame/error.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>


<form method="post">
<table class="titem" >
	<tr>
		<td class="field">用户名 *</td>
		<td class="value"><input class="common" type="text" name="name" value="<?php echo $_smarty_tpl->getVariable('user')->value['name'];?>
" /></td>
	</tr>
	<tr>
		<td class="field">用户密码</td>
		<td class="value"><input class="common" type="password" name="pass" value="" /></td>
	</tr>
	<tr>
		<td class="submit" colspan="2">
			<input type="submit" value="提交" />
			<input type="button" value="返回" onclick="javascript:history.go(-1);" />
		</td>
	</tr>
</table>
</form>

</div>

<?php $_template = new Smarty_Internal_Template("frame/foot.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>
