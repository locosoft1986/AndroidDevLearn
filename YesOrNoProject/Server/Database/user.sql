CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,  
  `name` varchar(50) CHARACTER SET utf8 NOT NULL, -- user name for login
  `nickname` varchar(50) CHARACTER SET utf8 NOT NULL, -- user's nickname
  `headface` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `age` INT DEFAULT NULL,
  `hobbies` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `place` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `comments` varchar(100) CHARACTER SET utf8 DEFAULT NULL, -- users self-introduction
  `ctime` DATE DEFAULT NULL, -- the date that this account was created
  `brand` varchar(50) CHARACTER SET utf8 DEFAULT NULL, -- the brand name of the user's phone
  `pass` varchar(112) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `gendor` int(11) DEFAULT '1',
  `phonenum` int(11) DEFAULT '0',
  `email` varchar(100) CHARACTER SET utf8 DEFAULT '',
  `utype` int(11) DEFAULT '0', -- user's type(0: common users, 1: admin)
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=42 ;

INSERT INTO `customer` (`id`, `name`, `nickname`,`headface`, `age`, `hobbies`, `place`, `comments`, `ctime`, `brand`, `pass`, `gendor`, `phonenum`, `utype`) VALUES
(0, 'admin000', 'Admin123', 'a1.jpg', '18', 'Hobby test1', 'Shanghai', 'User comments test1', '2014-05-16', NULL, 'admin', '1', '1334525975', '1'),
(1, 'locosoft', 'Locosoft', 'a1.jpg', '18', 'Hobby test1', 'SH', 'User introduchtion test1', '2014-05-16', NULL, 'admin', '1', '1136645568','1');
