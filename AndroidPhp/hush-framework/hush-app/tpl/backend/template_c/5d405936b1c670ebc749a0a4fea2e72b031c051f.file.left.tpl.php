<?php /* Smarty version Smarty3-b8, created on 2013-02-21 14:53:53
         compiled from "F:\androidphp\hush-framework\hush-app\tpl\backend\template\index/frame/left.tpl" */ ?>
<?php /*%%SmartyHeaderCode:167785125c4818a0fe5-65628027%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5d405936b1c670ebc749a0a4fea2e72b031c051f' => 
    array (
      0 => 'F:\\androidphp\\hush-framework\\hush-app\\tpl\\backend\\template\\index/frame/left.tpl',
      1 => 1357552552,
    ),
  ),
  'nocache_hash' => '167785125c4818a0fe5-65628027',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
)); /*/%%SmartyHeaderCode%%*/?>
<div class="left">

	<div class="menu" id="menu">
	
	<?php  $_smarty_tpl->tpl_vars['topAppList'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('appList')->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['topAppList']->index=-1;
if (count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['topAppList']->key => $_smarty_tpl->tpl_vars['topAppList']->value){
 $_smarty_tpl->tpl_vars['topAppList']->index++;
?>
		<?php  $_smarty_tpl->tpl_vars['groupList'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('topAppList')->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['groupList']->index=-1;
if (count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['groupList']->key => $_smarty_tpl->tpl_vars['groupList']->value){
 $_smarty_tpl->tpl_vars['groupList']->index++;
?>
		<div class="items_top_<?php echo $_smarty_tpl->getVariable('topAppList')->value['id'];?>
">
			<dl class="dl_items_<?php echo $_smarty_tpl->getVariable('topAppList')->index+1;?>
_<?php echo $_smarty_tpl->getVariable('groupList')->index+1;?>
">
			<dt><?php echo $_smarty_tpl->getVariable('groupList')->value['name'];?>
</dt>
			<dd>
				<ul>
					<?php  $_smarty_tpl->tpl_vars['appItem'] = new Smarty_Variable;
 $_from = $_smarty_tpl->getVariable('groupList')->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
if (count($_from) > 0){
    foreach ($_from as $_smarty_tpl->tpl_vars['appItem']->key => $_smarty_tpl->tpl_vars['appItem']->value){
?>
					<li><a href="<?php if ($_smarty_tpl->getVariable('appItem')->value['path']){?><?php echo $_smarty_tpl->getVariable('appItem')->value['path'];?>
<?php }else{ ?>javascript:;<?php }?>" target="main"><?php echo $_smarty_tpl->getVariable('appItem')->value['name'];?>
</a></li>
					<?php }} ?>
				</ul>
			</dd>
			</dl>
		</div><!-- Item End -->
		<?php }} ?>
	<?php }} ?>
	
	</div>

</div>
<!-- left end -->