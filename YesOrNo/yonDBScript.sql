-- Before this you need to execute "create databse yonDB; " and "use yonDB" to create and set the current DB.

-- User's information
CREATE TABLE IF NOT EXISTS `quser` (
  `USERID` INT NOT NULL AUTO_INCREMENT,
  `UNAME` varchar(50) CHARACTER SET utf8 NOT NULL,
  `UHEAD` varchar(50) CHARACTER SET utf8 DEFAULT NULL, -- user self defined thumb picture
  `UAGE` INT DEFAULT NULL,
  `UHOBBIES` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UPLACE` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `UDESCIPTION` varchar(50) CHARACTER SET utf8 DEFAULT NULL, -- user self introductions
  `UTIME` DATETIME DEFAULT NULL, -- the time when this user was created
  `UBRAND` varchar(50) CHARACTER SET utf8 DEFAULT NULL, -- the brand name of the user's phone
  `UPASS` varchar(112) CHARACTER SET utf8 NOT NULL DEFAULT '', -- password
  `USEX` INT DEFAULT '1',
  PRIMARY KEY (`USERID`)
) ENGINE=innodb DEFAULT CHARSET=gbk AUTO_INCREMENT=42 ;

INSERT INTO `quser` (`USERID`, `UNAME`, `UHEAD`, `UAGE`, `UHOBBIES`, `UPLACE`, `UDESCIPTION`, `UTIME`, `UBRAND`, `UPASS`, `USEX`) VALUES
(1, 'admin123', NULL, NULL, NULL, NULL, NULL, '2014-01-01 00:00:00', NULL, 'adminpassword123', '1'),
(2, 'locosoft', NULL, NULL, NULL, NULL, NULL, '2014-01-01 00:00:00', NULL, 'adminpassword123', '1'),
(10, '迈克尔', 'a20.jpg', '19', '骑车 电玩', '上海', '测试自我签名能不能用。', '2014-04-01 20:00:00', '三星 I9168I', 'password123', '0');



-- Posts of Yes Or No
CREATE TABLE IF NOT EXISTS `qpost` (
  `QID` INT NOT NULL AUTO_INCREMENT,
  `UID` INT DEFAULT NULL, -- user id, if null this post was posted anonymously
  `TID` INT DEFAULT NULL, -- type id (reserved)
  `QIMG` varchar(50) NOT NULL, -- image path
  `QCONTENT` varchar(500) NOT NULL, -- post content
  `QTIME` DATETIME DEFAULT NULL, -- POST Time
  `QLIKE` INT NOT NULL DEFAULT '0',
  `QUNLIKE` INT NOT NULL DEFAULT '0',
  `QCOMMENTS` INT DEFAULT '0', -- total number of comments
  `VALISTATUS` INT NOT NULL DEFAULT '0', -- is it a validated post(0: validating 1: validated 2:rejected)
  `REPORTED` INT DEFAULT '0', -- total reported count
  PRIMARY KEY (`QID`)
) ENGINE=innodb  DEFAULT CHARSET=gbk AUTO_INCREMENT=117 ;



INSERT INTO `qpost` (`QID`, `UID`, `TID`, `QIMG`, `QCONTENT`, `QLIKE`, `QUNLIKE`, `QCOMMENTS`, `VALISTATUS`) VALUES
(1, 1, 1, 'testpostpicture0001.jpg', '测试帖子111111', '2', '254', 3, 1);

-- comments for each post
CREATE TABLE IF NOT EXISTS `qcomments` (
  `CID` INT NOT NULL AUTO_INCREMENT,
  `CVALUE` varchar(255) CHARACTER SET utf8 NOT NULL,  -- the content of the comment
  `QID` INT NOT NULL, -- Post ID which contains this comment
  `UID` INT NOT NULL, -- user ID
  `CLIKE` INT DEFAULT '0',
  `CUNLIKE` INT DEFAULT '0',
  `CTIME` DATETIME NOT NULL, -- POST Time
  PRIMARY KEY (`CID`)
) ENGINE=myisam  DEFAULT CHARSET=gbk AUTO_INCREMENT=10603 ;

INSERT INTO `qcomments` (`CID`, `CVALUE`, `QID`, `UID`, `CTIME`) VALUES
(1, '啊…啊…… ', 1, 1, '2014-05-12 12:00:23');

-- conversations(or notes) of users
CREATE TABLE IF NOT EXISTS `notes` (
  `NID` INT NOT NULL AUTO_INCREMENT,
  `SUID` INT NOT NULL DEFAULT '0', -- user id that sent this note
  `RUID` INT NOT NULL DEFAULT '0', -- user id that replied this note
  `NVALUE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`NID`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk AUTO_INCREMENT=19 ;


INSERT INTO `notes` (`NID`, `SUID`, `RUID`, `NVALUE`) VALUES
(1, 1, 2, '你好'),
(2, 2, 1, '你好啊，'),
(3, 1, 2, '你是哪的啊'),
(4, 2, 1, '哈尔滨的，你呢'),
(5, 1, 2, '我是北京的'),
(6, 1, 2, '留个电话吧'),
(7, 2, 1, '15123456789'),
(8, 1, 2, '13123456789');

