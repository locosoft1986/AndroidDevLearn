CREATE TABLE IF NOT EXISTS `contents` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sceneid` INT UNSIGNED NOT NULL,
  `pagenum` INT UNSIGNED NOT NULL,
  `type` INT NOT NULL,
  `key` VARCHAR(45) NULL,
  `value` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  INDEX `sceneid_idx` (`sceneid` ASC),
  CONSTRAINT `sceneid`
    FOREIGN KEY (`sceneid`)
    REFERENCES `yondb`.`scene` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);
	
INSERT INTO `contents` (`id`, `sceneid`, `pagenum`, `type`, `key`, `value`) VALUES ('1', '1', '1', '0', 'ptitle', 'This is page one title');
INSERT INTO `contents` (`id`, `sceneid`, `pagenum`, `type`, `key`, `value`) VALUES ('2', '1', '1', '0', 'pcontent', 'This is the content of the page one.');
INSERT INTO `yondb`.`contents` (`id`, `sceneid`, `pagenum`, `type`, `key`, `value`) VALUES ('3', '1', '1', '1', 'pimage', 'scene1_page1_pimage.jpg');
