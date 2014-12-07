CREATE TABLE IF NOT EXISTS `scene` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` INT NULL,
  `title` VARCHAR(100) NOT NULL,
  `bgm` VARCHAR(150) NULL,
  `pagenum` INT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO `scene` (`id`, `uid`, `title`) VALUES ('0', '1', 'My first Scene APP :)');