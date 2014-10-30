-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost:3306
-- 生成日期: 2014 年 05 月 16 日 10:26
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
-- 表的结构 `notes`
--

CREATE TABLE IF NOT EXISTS `notes` (
  `NID` int(11) NOT NULL AUTO_INCREMENT,
  `SUID` int(11) NOT NULL DEFAULT '0',
  `RUID` int(11) NOT NULL DEFAULT '0',
  `NVALUE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`NID`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=19 ;

--
-- 转存表中的数据 `notes`
--

INSERT INTO `notes` (`NID`, `SUID`, `RUID`, `NVALUE`) VALUES
(1, 1, 2, '你好'),
(2, 2, 1, '你好啊，'),
(3, 1, 2, '你是哪的啊'),
(4, 2, 1, '哈尔滨的，你呢'),
(5, 1, 2, '我是北京的'),
(6, 2, 1, '哦哦，很高兴认识你'),
(7, 1, 2, '我也是，哈哈、'),
(8, 2, 1, '你是干什么的啊'),
(9, 1, 2, '我是android手机软件工程师'),
(10, 2, 1, '这么巧，我也是啊'),
(11, 1, 2, '真的吗'),
(12, 2, 1, '真的，我在哈尔滨华夏计算机职业技术学院毕业的，哈哈'),
(13, 1, 2, '哦哦，好巧'),
(14, 2, 1, '就是啊'),
(15, 1, 2, '留个电话吧'),
(16, 2, 1, '15123456789'),
(17, 1, 2, '13123456789');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
<br />
<b>Fatal error</b>:  Allowed memory size of 67108864 bytes exhausted (tried to allocate 8672681 bytes) in <b>Unknown</b> on line <b>0</b><br />
