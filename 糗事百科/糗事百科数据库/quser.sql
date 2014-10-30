-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost:3306
-- 生成日期: 2014 年 05 月 16 日 10:28
-- 服务器版本: 5.1.63-community
-- PHP 版本: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `534429149`
--

-- --------------------------------------------------------

--
-- 表的结构 `quser`
--

CREATE TABLE IF NOT EXISTS `quser` (
  `USERID` int(11) NOT NULL AUTO_INCREMENT,
  `UNAME` varchar(50) CHARACTER SET utf8 NOT NULL,
  `UHEAD` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UAGE` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UHOBBIES` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UPLACE` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UEXPLAIN` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UTIME` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UBRAND` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UPASS` varchar(112) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `USEX` varchar(255) CHARACTER SET utf8 DEFAULT '1',
  PRIMARY KEY (`USERID`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=42 ;

--
-- 转存表中的数据 `quser`
--

INSERT INTO `quser` (`USERID`, `UNAME`, `UHEAD`, `UAGE`, `UHOBBIES`, `UPLACE`, `UEXPLAIN`, `UTIME`, `UBRAND`, `UPASS`, `USEX`) VALUES
(1, 'ζ๓º无魂º', 'a1.jpg', '18', '篮球 羽毛球', '烟台', '❥、Ｈandsome在这里铸就,ｋing在这里诞生', '2014/05/16', '红米', '1', '1'),
(2, '⑨Pota*_*叶★少', 'a2.jpg', '23', '台球', '上海', '每天都是一个新的开始，大家一起加油哦', '2014/05/16', '苹果5S', '2', '1'),
(3, '筱风流7ml*^~', 'a3.jpg', '19', 'game', '长春', ' 有些事，有些人，当你陪着岁月走过时回头看来，突然觉得整个世界都变了，或许这就是青春！', '2014/05/16', '酷派 大神F1', '3', '0'),
(4, '尐   皇   帝', 'a4.jpg', '26', '梦三 魔兽 LOL', '沈阳', ' 当一个人说我丑的时候，我不信，当十个人说我丑的时候，我半信半疑，当所有人说我丑的时候，我终于相信自', '2014/05/16', 'VIVO Y17W ', '4', '1'),
(5, '②个魜.﹏′', 'a5.jpg', '23', '跑步', '深圳', '如果你去烫了发根 那么 刚开始你的发型是＂▽＂ 两个月后会变成＂口＂ 再两个月就是＂△＂ 最后就是＂', '2014/05/16', 'LG NEXUS 5', '5', '0'),
(6, '尼瑪尼瑪尼哄', 'a6.jpg', '22', '跑酷', '上海', ' 如果我死了，我的第一句话是：终于不用怕鬼了。', '2014/05/16', '联想 S898T', '6', '0'),
(7, '酸菠萝', 'a7.jpg', '21', '古筝', '香港', ' 走过了酸甜各一半的旅程 我单薄的心才可以变的丰盛', '2014/05/16', '诺基亚 LUMIA 1020', '7', '1'),
(8, '子墨先生?', 'a8.jpg', '28', '台球 跑步', '黑龙江', ' 我一直在纳闷，老师为什么要请家长，一个连未成年人都没教育好的人，还想教育成年人', '2014/05/16', '联想 K910', '8', '1'),
(9, 'Baron 缘', 'a9.jpg', '24', '电脑', '河北', ' 如果你愿意一层一层地剥开我的心 你会发现你会讶异，里面有二尖瓣、三尖瓣、隔缘肉柱、乳头肌，就是没有', '2014/05/16', 'OPPO N1T', '9', '0'),
(10, '义阁堂◈香主', 'a10.jpg', '23', '烹饪', '吉林', ' 刚才听到一姑娘电话跟人吵架，甩出一句巨犀利的话：“您的智商余额不足，请充值后再说。”', '2014/05/16', '三星 I8552', '10', '1'),
(11, '落尽残殇', 'a11.jpg', '23', '台球 电脑', '九江', ' 一日不读书，无人看得出； 一周不读书，开始会爆粗； 一月不读书，智商输给猪', '2014/05/16', '三星 NOTE 3', '11', '0'),
(12, '唉哟.那个旺爺', 'a12.jpg', '25', 'IT', '南昌', '苍老的身躯守候着就旧胡同的老阁楼  　　　凝滞的黑影像在倒映旧时的爱情', '2014/05/16', '华为 C8815 ', '12', '1'),
(13, '無理取鬧ゝ', 'a13.jpg', '22', '轮滑', '大连', ' 爱情总是让人多愁善感最怕的就是我满心欢喜的做好一件事送到你面前你却没有丝毫的惊喜感哪怕只是一点点', '2014/05/16', '酷派 7298A', '13', '0'),
(14, '繁风信子', 'a14.jpg', '31', '台球', '合肥', ' 通俗一点讲幸福就是一种体验，一种感觉，一种使人心情舒畅的的境遇和生活', '2014/05/16', '小米 2S ', '14', '0'),
(15, '给你我的温柔', 'a15.jpg', '20', '山地自行车', '太原', ' 知足常乐和幸福是一对不离不弃的孪生兄弟，只有感悟到知足的人才可以感悟到幸福的感觉', '2014/05/16', '中国移动 M601 ', '15', '0'),
(16, '義‖水寒', 'a16.jpg', '22', '锻炼', '重庆', '真实的生活幸福永远不会远离你而去，只有懂得善待生活的人，幸福才会永久的伴随你左右', '2014/05/16', '诺基亚 526', '16', '1'),
(17, '若相惜何必执手问年华', 'a17.jpg', '24', '广播', '大连', '我已经相信有些人我永远不必等 所以我明白在灯火阑珊处为什么会哭', '2014/05/16', '诺基亚 LUMIA 925 ', '17', '1'),
(18, '莎啦啦哩', 'a18.jpg', '23', '化妆', '辽阳', '直到和你做了多年朋友 才明白我的眼泪 不只为你而流 也为别人而流', '2014/05/16', '中兴 N919', '18', '0'),
(19, '路人甲', 'a19.jpg', '21', '跑步', '朝阳', '从我遇见你的那一天起 我就在心里恳求你\n如果生活是一条单行道 就请你从此走在我的前面 让我时时可以看', '2014/05/16', '三星 S6818', '19', '1'),
(20, '迈克尔，唐僧', 'a20.jpg', '19', '台球', '大庆', '不在乎我的人，我说痛他也不会有什么表情。心疼我的人，我不说他也会察觉我有多痛。 \r\n', '2014/05/16', '三星 I9168I', '20', '0'),
(41, '1', NULL, NULL, NULL, NULL, NULL, '2014/05/16', NULL, '1', '1');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
<br />
<b>Fatal error</b>:  Allowed memory size of 67108864 bytes exhausted (tried to allocate 8672425 bytes) in <b>Unknown</b> on line <b>0</b><br />
