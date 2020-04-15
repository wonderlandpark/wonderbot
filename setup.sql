CREATE TABLE `users` ( `id` TEXT NOT NULL  , `join` INT NOT NULL , `money` INT NOT NULL DEFAULT '0' , `money_cooldown` INT NOT NULL DEFAULT '0' , `badges` TEXT NOT NULL DEFAULT '[]', `items` TEXT NOT NULL DEFAULT "{}", `multiples` INT NOT NULL DEAFULT 0, `language` TEXT NOT NULL DEFAULT "ko", `cooldown` TEXT NOT NULL DEFAULT "{}", `action` BOOLEAN NOT NULL DEFAULT false);
CREATE TABLE `guilds` (`id` TEXT NOT NULL);
CREATE TABLE `items` ( `name` TEXT NOT NULL, `last_change` INT, `money` INT NOT NULL DEFAULT '0' , `change` INT NOT NULL DEFAULT '0');
CREATE TABLE `blacklist` (`id` TEXT NOT NULL, `time` INT NOT NULL, `why` TEXT NOT NULL DEFAULT 'none');
CREATE TABLE `stocks` ( `name` TEXT NOT NULL, `prices` TEXT NOT NULL DEFAULT '[100]', `lastchange` INT NOT NULL DEFAULT 0, `now` INT NOT NULL DEFAULT 100);
CREATE TABLE `shards` ( `id` INT NOT NULL , `lastupdate` INT NOT NULL DEFAULT '0', `guilds` INT NOT NULL DEFAULT '0' , `users` INT NOT NULL DEFAULT '0' , `ping` INT NOT NULL DEFAULT '0' `memory` INT NOT NULL DEFAULT '0');
INSERT INTO `stocks`(`name`) VALUES ('wondercoin'); 
INSERT INTO `stocks`(`name`) VALUES ('gukbap'); 
INSERT INTO `stocks`(`name`) VALUES ('coffee');
INSERT INTO `stocks`(`name`) VALUES ('diamond');  
INSERT INTO `stocks`(`name`) VALUES ('figure');  

CREATE TABLE `info` (`stock` INT NOT NULL DEFAULT 0);
CREATE TABLE `error` (`id` TINYTEXT NOT NULL, `date` INT NOT NULL DEFAULT 0,  `user` TEXT NOT NULL, `cmd` TEXT NOT NULL, `content` TEXT NOT NULL, `msg` TEXT NOT NULL, `error` TEXT NOT NULL, `guild` TEXT NOT NULL, `info` TEXT NOT NULL);
