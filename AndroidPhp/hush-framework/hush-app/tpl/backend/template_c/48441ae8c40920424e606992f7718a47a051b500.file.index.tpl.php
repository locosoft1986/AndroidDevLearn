<?php /* Smarty version Smarty3-b8, created on 2013-02-21 14:54:08
         compiled from "F:\androidphp\hush-framework\hush-app\tpl\backend\template\bpm/admin/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:246765125c4905520a4-95027173%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '48441ae8c40920424e606992f7718a47a051b500' => 
    array (
      0 => 'F:\\androidphp\\hush-framework\\hush-app\\tpl\\backend\\template\\bpm/admin/index.tpl',
      1 => 1357552554,
    ),
  ),
  'nocache_hash' => '246765125c4905520a4-95027173',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<?php $_template = new Smarty_Internal_Template("frame/head.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>


<div class="maintop">
<img src="<?php echo $_smarty_tpl->getVariable('_root')->value;?>
img/icon_arrow_right.png" class="icon" /> 已定义流程列表
</div>

<div class="mainbox">

<table class="tlist" >
	<thead>
		<tr class="title">
			<th align="left" style="width:100px;">&nbsp;ID</th>
			<th align="left">流程名</th>
			<th align="left">流程类别</th>
			<th align="left">流程状态</th>
			<th align="right">操作&nbsp;</th>
		</tr>  
	</thead>
	<tbody>
		<?php  $_smarty_tpl->tpl_vars['flow'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('bpmFlowList')->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
if (count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['flow']->key => $_smarty_tpl->tpl_vars['flow']->value){
?>
		<tr>
			<td align="left"><?php echo $_smarty_tpl->getVariable('flow')->value['bpm_flow_id'];?>
</td>
			<td align="left"><a href='adminEditBasic/flowId/<?php echo $_smarty_tpl->getVariable('flow')->value['bpm_flow_id'];?>
'><u><?php echo $_smarty_tpl->getVariable('flow')->value['bpm_flow_name'];?>
</u></a></td>
			<td align="left"><?php echo $_smarty_tpl->getVariable('flow')->value['bpm_flow_type'];?>
</td>
			<td align="left"><?php if ($_smarty_tpl->getVariable('flow')->value['bpm_flow_status']==1){?><font color="green">已确认</font><?php }else{ ?><font color="red">未确认</font><?php }?></td>
			<td align="right">
				<a href="adminEditBasic/flowId/<?php echo $_smarty_tpl->getVariable('flow')->value['bpm_flow_id'];?>
">编辑</a> | 删除
			</td>
		</tr>
		<?php }} ?>
	</tbody>
	<tfoot>
		<tr>
			<td colspan="5">
				<button type="button" class="btn1s" onclick="javascript:location.href='adminAddBasic';">新增</button>
			</td>
		</tr>
	</tfoot>
</table>

<?php $_template = new Smarty_Internal_Template("frame/page.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>


</div>

<?php $_template = new Smarty_Internal_Template("frame/foot.tpl", $_smarty_tpl->smarty, $_smarty_tpl, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null);
 echo $_template->getRenderedTemplate();?><?php $_template->updateParentVariables(0);?><?php unset($_template);?>
