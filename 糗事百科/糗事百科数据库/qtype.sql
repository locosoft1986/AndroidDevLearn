-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost:3306
-- 生成日期: 2014 年 05 月 16 日 10:27
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
-- 表的结构 `qtype`
--

CREATE TABLE IF NOT EXISTS `qtype` (
  `TID` int(11) NOT NULL AUTO_INCREMENT,
  `TNAME` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`TID`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `qtype`
--

INSERT INTO `qtype` (`TID`, `TNAME`) VALUES
(1, '干货'),
(2, '嫩草'),
(3, '文字'),
(4, '日'),
(5, '周'),
(6, '月'),
(7, '硬菜'),
(8, '时令'),
(9, '穿越');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
<br />
<b>Fatal error</b>:  Allowed memory size of 67108864 bytes exhausted (tried to allocate 8672681 bytes) in <b>Unknown</b> on line <b>0</b><br />
