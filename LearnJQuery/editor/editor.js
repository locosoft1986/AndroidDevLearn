// JS编辑器 
// @version beta 0.1
// @date 2010-03-21
// @author liangchao
// @blog http://www.cnblogs.com/bluedream2009
// @email liangchaoyjs@163.com
var co = co || {};
co.Root = 'http://www.cnblogs.com/images/cnblogs_com/goodness2010/238089/';  // 图片的根目录
// 浏览器判断
co.browser = (function(ua) {
	var b = {
		msie: /msie/.test(ua) && !/opera/.test(ua),
		opera: /opera/.test(ua),
		safari: /webkit/.test(ua) && !/chrome/.test(ua),
		firefox: /firefox/.test(ua),
		chrome: /chrome/.test(ua)
	};
	var vMark = '';
	for(var i in b) {
		if(b[i]) { vMark = /(?:safari|opera)/.test(i) ? 'version' : i; break; }
	}
	b.version = vMark && RegExp('(?:'+ vMark +')[\\/: ]([\\d.]+)').test(ua) ? RegExp.$1 : 0;

	b.ie = b.msie;
	b.ie6 = b.msie && parseInt(b.version) == 6;
	b.ie7 = b.msie && parseInt(b.version) == 7;
	b.ie8 = b.msie && parseInt(b.version) == 8;
	return b;
})(window.navigator.userAgent.toLowerCase());

// ie6图片强制缓存
try {
	co.browser.ie6 && document.execCommand('BackgroundImageCache', true, false);
} catch(ex) {};

// 获取ID对象
co.getId = function(id) { return document.getElementById(id); };

// 获取对象
co.get = function(node) {
	return typeof(node) == 'string' ? document.getElementById(node) : node;
};

// 创建DOM对象
co.append = function(parentNode, tag, attributes) {
	var o = document.createElement(tag);
	if(attributes && typeof(attributes) == 'string') {
		o.className = attributes;
	} else {
		co.setProperties(o, attributes);
	}
	co.get(parentNode).appendChild(o);
	return o;
};

// 遍历数组
co.foreach = function(arr, callback) {
	for(var i = 0, l = arr.length; i < l; i++) {
		arr[i] = callback(arr[i]);
	}
	return arr;
};

// 设置属性
co.DIRECT_ATTRIBUTE_MAP_ = {
	'cellpadding': 'cellPadding',
	'cellspacing': 'cellSpacing',
	'colspan': 'colSpan',
	'rowspan': 'rowSpan',
	'valign': 'vAlign',
	'height': 'height',
	'usemap': 'useMap',
	'frameborder': 'frameBorder',
	'type': 'type'
};

co.setProperties = function(element, properties) {
	var val;
	for(var key in properties) {
		val = properties[key];
		if(key == 'style') {
			element.style.cssText = val;
		} else if(key == 'class') {
			element.className = val;
		} else if(key == 'for') {
			element.htmlFor = val;
		} else if(key in co.DIRECT_ATTRIBUTE_MAP_) {
			element.setAttribute(co.DIRECT_ATTRIBUTE_MAP_[key], val);
		} else {
			element[key] = val;
		}
	}
	return element;
};

// 属性扩展
co.extend = function(destination, source) {
	for(var property in source) {
		destination[property] = source[property];
	}
	return destination;
};

// 获取元素绝对位置
co.getPos = function(o) {
	for(var _pos = {x: 0, y: 0}; o; o = o.offsetParent) {
		_pos.x += o.offsetLeft;
		_pos.y += o.offsetTop;
	}
	return _pos;
};

// 设置透明度
co.setOpacity = function(e, opac) {
	if(co.browser.ie) {
		e.style.filter = "alpha(opacity=" + opac*100 + ")";
	} else {
		e.style.opacity = opac;
	}
}

// 事件绑定
co.addEvent = function(el, type, fn) {
	el.addEventListener ? el.addEventListener(type, fn, false) : 
	el.attachEvent('on' + type, function() { fn.call(el); })
};

co.target = function(e) {
	return e ? e.target : event.srcElement;
}

// 禁止冒泡
co.cancelBubble = function(e) {
	if(e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
};

/**
 * 抽象单类工厂
 * @method create(cfg{必须有一个唯一的id标识})
 */
var newFactory = function() {
	var coll = {};
	return {
		create: function(fn, cfg, content/* POP_Body*/) {
			if(coll[cfg.id]) {
				return coll[cfg.id];
			} else {
				var win = fn(cfg, content); 
				coll[cfg.id] = win;
				return win;
			}
		}
	}
}();

/**
 *  ---------------------------------- PopUp窗口辅助类 -----------------------------
 *	config:
 *	id: 容器id
 *	title: 容器标题
 *  container: 容器class
 *	concss: 标题内容样式
 *	heacss: 标题外部样式
 *	bodcss: 容器内容样式
 *	chicss: 内容子列表样式
 *	content: 子列表内容
 *  @describe clicking on an element with the unselectable attribute set to on does not destroy the current selection if one exists.
 */
var popUp = {};

popUp.create = function(config, body) {
	this.container = co.append(document.body, 'div', config['container']);
	this.container.id = config.id;
	var _head = '<div class="' + config.heacss + '"><span class="' + config.concss + '">' + config.title +'</span></div>';
	var _body = '<div class="' + config.bodcss + '">';
	_body += (body || '');
	_body += '</div>';
	this.container.innerHTML = _head + _body;
	return this.container;
};

/*--------------------------------- ColorPicker辅助组件(单独提出.松耦合) -------------------------------------------*/
var ColorPicker = {
	create: function() {
		// 定义变量
		var cl = ['00', '33', '66', '99', 'CC', 'FF'], a, b, c, d, e, f, i, j, k, T;
		// 创建整个外围容器
		this.win = co.append(document.body, 'div');
		this.win.id = 'colorPicker';
		// 创建head
		var h = '<div class="colorhead"><span class="colortitle">颜色选择</span></div>';
		// 创建body [6 x 6的色盘]
		h += '<div class="colorbody"><table cellspacing="0" cellpadding="0"><tr>';
		for(i = 0; i < 6; ++i) {
			h += '<td><table class="colorpanel" cellspacing="0" cellpadding="0">';
			for(j = 0, a = cl[i]; j < 6; ++j) {
				h += '<tr>';
				for(k = 0, c = cl[j]; k < 6; ++k) {
					b = cl[k];
					e = k == 5 && i != 2 && i != 5 ? ';border-right:none;' : '';
					f = j == 5 && i < 3 ? ';border-bottom:none': '';
					d = '#' + a + b + c;
					T = co.browser.ie ? '&nbsp;': ''
					h += '<td unselectable="on" style="background: ' + d + e + f + '" title="' + d + '">' + T + '</td>'; /* 切记设置unselectable='on'*/
				}
				h += '</tr>';
			}
			h += '</table></td>';
			if(cl[i] == '66') h += '</tr><tr>';
		}
		h += '</tr></table></div>';
		this.win.innerHTML = h;
		return this.win;
	}
};

/*--------------------------------- 编辑器基类 -----------------------------------------*/
var editor = function(id, bardata, options) {
	this.container = co.getId(id);
	this.bardata = bardata;
	this.currActive = null;
	this.bookmark = null;
	co.extend(this, this.setOptions(options));
	// 创建框架结构
	this.createStruct();
	// 创建快照书签
	co.browser.ie && this.saveBookMark();
};
// 静态变量https://developer.mozilla.org/en/Rich-Text_Editing_in_Mozilla
editor.NO_ARG_COMMAND = {
	BOLD: 'bold',
	ITALIC: 'italic',
	UNDERLINE: 'underline',
	CUT: 'cut',
	COPY: 'copy',
	JUSTIFYLEFT: 'justifyleft',
	JUSTIFYRIGHT: 'justifyright',
	JUSTIFYCENTER: 'justifycenter',
	INSERTUNORDEREDLIST: 'insertunorderedlist',
	INSERTORDEREDLIST: 'insertorderedlist',
	OUTDENT: 'outdent',
	INDENT: 'indent',
	REMOVEFORMAT: 'removeformat'
};
// 原型扩展
editor.prototype = {
	setOptions: function(options) {
		this.options = {
			emotion: [
				{ 'title': '微笑', 'pos': '-5px -5px',  'url': co.Root + 'o_220510752_p_r2_c2.gif' }, 
				{ 'title': '大笑', 'pos': '-32px -5px', 'url': co.Root + 'o_220510752_p_r2_c3.gif' },
				{ 'title': '窃笑', 'pos': '-59px -5px', 'url': co.Root + 'o_220510752_p_r2_c4.gif' },
				{ 'title': '眨眼', 'pos': '-86px -5px', 'url': co.Root + 'o_220510752_p_r2_c5.gif' },
				{ 'title': '吐舌', 'pos': '-113px -5px','url': co.Root + 'o_220510752_p_r2_c11.gif'},
				{ 'title': '色色', 'pos': '-140px -5px','url': co.Root + 'o_220510752_p_r2_c6.gif' },
				{ 'title': '呲牙', 'pos': '-168px -5px','url': co.Root + 'o_220510752_p_r2_c7.gif' },
				{ 'title': '讨厌', 'pos': '-194px -5px','url': co.Root + 'o_220510752_p_r2_c8.gif' }
			],
			baroverOpc: 0.7
		};
		return co.extend(this.options, options || {});
	},
	// 创建编辑器整个框架结构
	createStruct: function() {
		// 创建工具条
		this.createToolBar();
		// 创建隐藏textarea容器
		this.createTextArea();
		// 创建iframe容器
		this.createIframe();
		// 创建工具底栏
		this.createToolFoot();
		// 创建工具条遮盖层
		this.createToolLayer();
	},
	// 创建工具条
	createToolBar: function() {
		var _this = this;
		this.bar = co.append(this.container, 'div');
		this.bar.id = 'ebar'; this.bar.className = 'ebar';
		for(var i = 0, l = this.bardata.length; i < l; i++) {
			var sp = co.append(this.bar, 'span');
			co.setProperties(sp, this.bardata[i]);
		}
		// 事件代理
		this.bar.onmousedown = function(e) {
			var t = co.target(e), command = t['command'];
			if(t.tagName == 'SPAN') {
				if(!!command) {
					_this.changeSty(t, 'active'); // 切换样式
					if(command.toUpperCase() in editor.NO_ARG_COMMAND) { // 不需要参数的命令
						if(co.browser.firefox) { /* firefox暂不提供粘贴, 剪切, 复制功能 详见http://www.mozilla.org/editor/midasdemo/securityprefs.html*/
							if(command.toUpperCase() == 'CUT' || command.toUpperCase() == 'COPY') {
								alert('为了信息安全FF暂不提供该功能');
								return false;
							}
						}
						_this.doEditCommand(command);
						_this.ifr.contentWindow.focus(); // 焦点要记住
					} else {
						switch(command) {								 // 代理分支 
							case 'fontSize': // 字号
							case 'fontName': // 字体
							case 'createLink': // 创建连接
							case 'insertImage': // 插入图片
							case 'insertEmotion': // 插入表情
							case 'insertHTML': // 插入表格
								_this.setPopInit(command, t /*被点击的控件*/); /* 需要pop类弹窗的公用初始化方法 */
								break;
							case 'foreColor': // 颜色
								_this.setFontColor(command, t);
								break;
							case 'autoLay': // 自动排版
								_this.autoLay();
								break;
							default:
								alert('没有提供此项功能');
								break;
						}
					}
				}
			}
		};
		// 样式切换
		this.bar.onmouseup = function(e) { _this.changeSty(co.target(e), 'curr'); };
		this.bar.onmouseover = function(e) { _this.changeSty(co.target(e), 'hover'); };
		this.bar.onmouseout = function(e) { _this.changeSty(co.target(e), 'curr'); };
	},
	// 样式切换
	changeSty: function(t, sign) {
		if(t.tagName == 'SPAN') {
			if(sign == 'curr') {
				t.className = this.bardata[t['index']]['class'];
				this.currActive = null;
			} else {
				if(!!this.currActive) {
					this.currActive.className =  this.bardata[this.currActive['index']]['class'];
				} 
				t.className = 'tag ' +  this.bardata[t['index']][sign];
				this.currActive = t;				
			}
		}
	},

	// 抽象需要弹窗功能的公用接口
	setPopInit: function(command, tar) {
		var cfg = '', _body = '', _td = '', S = '';
		if(command == 'fontSize') {
			cfg = {
				'id': 'fscon',
				'title': '字号',
				'container': 'fscon',
				'concss': 'fsn',
				'heacss': 'fshead',
				'bodcss': 'fsbody',
				'chicss': ['bas f1', 'bas f2', 'bas f3', 'bas f4', 'bas f5', 'bas f6', 'bas f7'],
				'content': ['字号1', '字号2', '字号3', '字号4', '字号5', '字号6', '字号7']
			};	
			for(var i = 0, l = cfg.content.length; i < l; i++) {
				_body += '<a class="' + cfg.chicss[i] + '" href="javascript:void(0);">' + cfg.content[i] + '</a>';
			}
		}
		if(command == 'fontName') {
			cfg = {
				'id': 'ffcon',
				'title': '字体',
				'container': 'ffcon',
				'concss': 'fsn',
				'heacss': 'fshead',
				'bodcss': 'fsbody',
				'chicss': ['bas', 'bas', 'bas', 'bas', 'bas', 'bas', 'bas', 'bas', 'bas'],
				'content': ['宋体', '黑体', '楷体', '隶书', '幼圆', 'Arial', 'Georgia', 'Verdana', 'Helvetica']		
			};	
			for(var i = 0, l = cfg.content.length; i < l; i++) {
				_body += '<a class="' + cfg.chicss[i] + '" href="javascript:void(0);">' + cfg.content[i] + '</a>';
			}
		}
		if(command == 'createLink' || command == 'insertImage' || command == 'insertEmotion') { // 创建链接 + 插入图片 + 插入表情形体类似. 只需要单独定制id和title即可
			cfg = {'container':'flcon', 'concss':'fsn', 'heacss':'fshead', 'bodcss':'fsbody'};
			if(command == 'createLink') { cfg.title = '插入链接';	/*title*/cfg.id = 'fflink';/*容器id*/cfg.txtId = 'lurl';	/*文本框id*/cfg.cofbtnId = 'lkcof';/* 确认按钮*/cfg.celbtnId = 'lkcel';}/*撤销按钮*/
			if(command == 'insertImage') { cfg.title = '插入图片';cfg.id = "ffimage";cfg.txtId = 'limg';cfg.cofbtnId = 'imcof';cfg.celbtnId = 'imcel';} 
			if(command == 'insertEmotion') { cfg.title = '插入表情';cfg.id = "ffemotion";cfg.container="emotionCon"; }
			if(command == 'createLink' || command == 'insertImage') {
				_body += '<div style="padding:7px;background-color:#FFF;font-size:12px;"><span>链接地址</span>';
				_body += '<input type="text" id="' + cfg.txtId + '" style="width:200px;" /></div>';
				_body += '<div style="text-align:center;">'
				_body += '<img id="' + cfg.cofbtnId + '" style="padding-right:10px;" src="'+co.Root+'o_220836549.p.gif" />';
				_body += '<img id="' + cfg.celbtnId + '" src="'+co.Root+'o_220726721.p.gif" /></div>';
			}
			if(command == 'insertEmotion') {
				for(var i = 0, l = this.emotion.length; i < l; i++) {
					S += ';background-position:' + this.emotion[i]['pos'] + ';width:21px;height:21px;'
					_td += '<td unselectable="on" url="'+this.emotion[i].url+'" title='+this.emotion[i]['title']+' style="cursor:pointer;background-image:url('+co.Root+'o_220510752_p.gif)'+S+'"></td>';
				}
				_body += '<table><tr>'+ _td +'</tr></table>';
			}
		}
		if(command == 'insertHTML') {
			cfg = {
					    'id':'fftable','title':'插入表格','container':'isbtlCon','concss':'fsn','heacss':'fshead',
				        'bodcss':'fsbody','rowId':'rowtxt','cellId':'celltxt','cfmId':'tblcfm','celId':'tblcel',
						'tblwId':'tblwid','tblhId':'tblhid'	
				  };
			_body += '<div class="tblCon">行数<input type="text" id="'+cfg.rowId+'" class="tblTxt" />列数<input type="text" id="'+cfg.cellId+'" class="tblTxt" /></div>';
			_body += '<div class="tblCon">表格的宽度<input type="text" id="'+cfg.tblwId+'" class="tblTxt" />px</div>';
			_body += '<div class="tblCon">表行的高度<input type="text" id="'+cfg.tblhId+'" class="tblTxt" />px<div class="tblbtn">';
			_body += '<img id="'+cfg.cfmId+'" style="padding-right:6px;" src="'+co.Root+'o_220836549.p.gif" />';
			_body += '<img id="'+cfg.celId+'" src="'+co.Root+'o_220726721.p.gif" /></div></div>';
		}
		this.setPopRun(command, cfg, cfg.title, tar, _body);
	},
	// 实现POP弹窗的所有功能
	setPopRun: function(command, cfg, title, tar/* 点击的控件 */, content/* POP弹窗的body内容 */) {
		var _this = this;
		var fwin = newFactory.create(popUp.create, cfg, content);
		_this.fixPop(fwin, tar);	// 定位弹窗
		if(title == '插入链接' || title == '插入图片') { /* 插入链接和插入图片需要特殊定制 */
			co.getId(cfg.cofbtnId).onclick = function() { // 此处不用addEvent添加事件.避免多次绑定
				var _val = co.getId(cfg.txtId).value;
				if(_val.length == 0) _val = ' '; // IE下链接可以为空.但其他最起码有一个空格.否则报错
				_this.doEditCommand(command, _val);
				co.getId(cfg.id).style.display = "none"; 
			}; //确认
			co.getId(cfg.celbtnId).onclick = function() { co.getId(cfg.id).style.display = "none"; }
		}
		if(title == '插入表格') {
			co.getId(cfg.cfmId).onclick = function() {
				var _html = _this.createTblHtml(cfg);
				if(!co.browser.ie) { // IE不支持insertHTML
					_this.doEditCommand(command, _html);
				} else {
					_this.ifr.contentWindow.focus(); // 注意IE下 focus问题
					_this.doc.selection.createRange().pasteHTML(_html);
				}
				co.getId(cfg.id).style.display = 'none';
			};
			co.getId(cfg.celId).onclick = function() { co.getId(cfg.id).style.display = 'none'; }
		}
		_this.hidePop(fwin, title); // bind隐藏弹窗
		fwin.onclick = function(e) {
			var t = co.target(e);
			if(title == '插入链接' || title == '插入图片' || title == '插入表格') { co.cancelBubble(e); } // 插入链接和图片禁止冒泡
			if(t.tagName == 'A') { /* 字号和字体 */
				_this.doEditCommand(command, command == 'fontSize' ? t.innerHTML.slice(-1) : t.innerHTML);
			} else if(t.tagName == 'TD') { /* 表情 */
				_this.doEditCommand('insertImage', t.getAttribute('url'));
			}
		};	
	},
	// 设置字体颜色 
	setFontColor: function(command, tar) {
		var _this = this;
		var fwin = newFactory.create(ColorPicker.create, {'id':'colorPicker'});
		_this.fixPop(fwin, tar);	// 定位弹窗
		_this.hidePop(fwin, '文字颜色');
		co.addEvent(fwin, 'click', function(e) {
			var t = co.target(e);
			if(!!t.title) {
				_this.doEditCommand(command, t.title);
			}
		});
	},
	// 自动排版
	autoLay: function() {
		var _child = this.doc.body.childNodes;
		for(var i = 0, l = _child.length; i < l; i++){
			if(_child[i].tagName == 'DIV' || _child[i].tagName == 'P') {
				_child[i].style.textIndent = _child[i].style.textIndent == '2em' ? '' : '2em'; // text-indent属性
			}
		}
	},
	// 生成Table的HTML
	createTblHtml: function(cfg) {
		var _rownum = co.getId(cfg.rowId).value, _cellnum = co.getId(cfg.cellId).value,
			_tblwid = co.getId(cfg.tblwId).value, _tblhei = co.getId(cfg.tblhId).value;	
		var _html = '<table border="1" width="'+_tblwid+'">';
		for(var i = 0; i < parseInt(_rownum,10); i++) { // 行
			_html += '<tr height="'+_tblhei+'">';
			for(var j = 0; j < parseInt(_cellnum,10); j++) { // 列
				_html += '<td></td>';
			}
			_html += '</tr>';
		}	
		_html +='</table>';
		return _html;
	},
	// 保存快照用于IE定位
	saveBookMark: function() {
		var _this = this;
		co.addEvent(_this.ifr, 'beforedeactivate', function() {
			var rng = _this.doc.selection.createRange();
			if(rng.getBookmark) {
				_this.bookmark = _this.doc.selection.createRange().getBookmark(); // 保存光标用selection下的createRange();
			}
		});
		co.addEvent(_this.ifr, 'activate', function() {
			if(_this.bookmark) {
				// Moves the start and end points of the current TextRange object to the positions represented by the specified bookmark.
				// 将光标移动到 TextRange 所以需要用 body.createTextRange();
				var rng = _this.doc.body.createTextRange();				
				rng.moveToBookmark(_this.bookmark);
				rng.select();
				_this.bookmark = null;
			}
		});
	},
	// 定位弹窗 
	fixPop: function(fwin, tar) {
		co.setProperties(fwin, {'style': 'top:' + (co.getPos(tar).y + tar.offsetHeight) + 'px; left:' + co.getPos(tar).x + 'px' });
	},
	// 隐藏弹窗
	hidePop: function(fwin, title) {
		co.addEvent(document, 'click', function(e) {
			var t = co.target(e);
			fwin.style.display = t.title == title ? 'block' : 'none';
		});
		co.addEvent(this.doc, 'click', function(e) { fwin.style.display = 'none'; }); /* 注意:绑定iframe事件句柄需要用W3C接口(addEventListener) */	
	},
	// 执行命令
	doEditCommand: function(name, arg) {
		try {
			this.ifr.contentWindow.focus(); // 放置焦点要操作contentWindow
			this.doc.execCommand(name, false, arg);		
		} catch(e) {}
	},
	// 创建隐藏文本域
	createTextArea: function() {
		this.txtarea = co.append(this.container, 'textarea');
		this.txtarea.id='bgcode'; this.txtarea.style.display = 'none';
	},
	// 创建空白iframe
	createIframe: function() {
		var _this = this;
		this.ifr = co.append(this.container, 'iframe', {'frameborder': 0, 'style': 'border:0; vertical-align:bottom', 'class': 'econtent' });
		this.doc =  this.ifr.contentDocument || this.ifr.contentWindow.document; // W3C || IE
		this.doc.designMode = 'on';
		this.doc.open();
		// margin为了消除iframe中的html上部的空白
		this.doc.write('<html><head><style>body{ margin:3px; word-wrap:break-word; word-break: break-all; }</style></head><body>GoodNessEditor</body></html>');
		this.ifr.contentWindow.focus();
		this.doc.close();
		// 当iframe失去焦点.偷偷将代码存入textare中
		co.addEvent(this.ifr.contentWindow, 'blur', function() {
			_this.txtarea.value = _this.doc.body.innerHTML;
		});
	},
	// 创建编辑器底部
	createToolFoot: function() {
		var _this = this;
		co.append(this.container, 'div', 'efoot').innerHTML = '<input type="checkbox" id="showCode" /><label for="showCode">显示源码</label>';
		// 绑定显示源码事件
		co.getId('showCode').onclick = function() { 
			if(this.checked) {
				_this.layer.style.display = 'block';
				co.getId('bgcode').style.display = 'block';
				_this.ifr.style.display = 'none';
			} else {
				_this.layer.style.display = 'none';
				co.getId('bgcode').style.display = 'none';
				_this.doc.body.innerHTML = co.getId('bgcode').value;
				_this.ifr.style.display = 'block';				
			}
		};
	},
	// 创建工具栏遮盖层
	createToolLayer: function() {
		this.layer = co.setProperties(
			co.append(document.body,'div'), 
			{
				'style':'width:'+this.bar.offsetWidth+'px;height:'+this.bar.offsetHeight+'px;background-color:#fff;position:absolute;display:none'
			}
		);
		co.setOpacity(this.layer, this.baroverOpc);
		this.layer.style.left = co.getPos(this.bar).x + 'px';
		this.layer.style.top = co.getPos(this.bar).y + 'px';
	}
};
