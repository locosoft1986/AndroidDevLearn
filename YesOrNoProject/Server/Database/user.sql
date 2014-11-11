CREATE TABLE IF NOT EXISTS `quser` (
  `USERID` int(11) NOT NULL AUTO_INCREMENT,  
  `UNAME` varchar(50) CHARACTER SET utf8 NOT NULL, -- user name for login
  `UNICKNAME` varchar(50) CHARACTER SET utf8 NOT NULL, -- user's nickname
  `UHEAD` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UAGE` INT DEFAULT NULL,
  `UHOBBIES` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `UPLACE` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `UCOMMENT` varchar(100) CHARACTER SET utf8 DEFAULT NULL, -- users self-introduction
  `UTIME` DATE DEFAULT NULL, -- the date that this account was created
  `UBRAND` varchar(50) CHARACTER SET utf8 DEFAULT NULL, -- the brand name of the user's phone
  `UPASS` varchar(112) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `USEX` int(11) DEFAULT '1',
  `UTYPE` int(11) DEFAULT '0', -- user's type(0: common users, 1: admin)
  PRIMARY KEY (`USERID`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=42 ;

INSERT INTO `quser` (`USERID`, `UNAME`, `UNICKNAME`,`UHEAD`, `UAGE`, `UHOBBIES`, `UPLACE`, `UCOMMENT`, `UTIME`, `UBRAND`, `UPASS`, `USEX`, `UTYPE`) VALUES
(0, 'admin', 'Admin1', 'a1.jpg', '18', 'Hobby test1', 'Shanghai', 'User comments test1', '2014-05-16', NULL, 'admin', '1', '1'),
(1, 'locosoft', 'Locosoft', 'a1.jpg', '18', 'Hobby test1', 'SH', 'User introduchtion test1', '2014-05-16', NULL, 'admin', '1', '1');