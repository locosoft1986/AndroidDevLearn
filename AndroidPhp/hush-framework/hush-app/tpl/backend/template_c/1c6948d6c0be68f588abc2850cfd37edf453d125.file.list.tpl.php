<?php /* Smarty version Smarty3-b8, created on 2013-02-21 14:53:57
         compiled from "F:\androidphp\hush-framework\hush-app\tpl\backend\template\acl/role/list.tpl" */ ?>
<?php /*%%SmartyHeaderCode:151745125c48551c254-01154079%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '1c6948d6c0be68f588abc2850cfd37edf453d125' => 
    array (
      0 => 'F:\\androidphp\\hush-framework\\hush-app\\tpl\\backend\\template\\acl/role/list.tpl',
      1 => 1357552552,
    ),
  ),
  'nocache_hash' => '151745125c48551c254-01154079',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<?php $_template = new Smarty_Internal_Template("frame/head.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>


<div class="maintop">
<img src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
img/icon_arrow_right.png" class="icon" /> 后台角色列表
</div>

<div class="mainbox">

<table class="tlist" >
	<thead>
		<tr class="title">
			<th align="left" style="width:100px;">&nbsp;ID</th>
			<th align="left">角色名</th>
			<th align="left">角色别名</th>
			<th align="left">可操作角色</th>
			<th align="right">操作&nbsp;</th>
		</tr>  
	</thead>
	<tbody>
		<?php  $_smarty_tpl->tpl_vars['role'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('roleList')->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
if (count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['role']->key => $_smarty_tpl->tpl_vars['role']->value){
?>
		<tr>
			<td align="left"><?php echo $_smarty_tpl->getVariable('role')->value['id'];?>
</td>
			<td align="left"><a href='roleEdit?id=<?php echo $_smarty_tpl->getVariable('role')->value['id'];?>
'><u><?php echo $_smarty_tpl->getVariable('role')->value['name'];?>
</u></a></td>
			<td align="left"><?php echo $_smarty_tpl->getVariable('role')->value['alias'];?>
</td>
			<td align="left"><?php echo $_smarty_tpl->getVariable('role')->value['role'];?>
</td>
			<td align="right">
				<a href="roleEdit?id=<?php echo $_smarty_tpl->getVariable('role')->value['id'];?>
">编辑</a> | 删除
			</td>
		</tr>
		<?php }} ?>
	</tbody>
	<tfoot>
		<tr>
			<td colspan="5">
				<button type="button" class="btn1s" onclick="javascript:location.href='roleadd';">新增</button>
			</td>
		</tr>
	</tfoot>
</table>

<?php $_template = new Smarty_Internal_Template("frame/page.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>


</div>

<?php $_template = new Smarty_Internal_Template("frame/foot.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>
