CREATE TABLE `users` ( `id` TEXT NOT NULL  , `join` INT NOT NULL , `money` INT NOT NULL DEFAULT '0' , `money_cooldown` INT NOT NULL DEFAULT '0' , `badges` TEXT NOT NULL DEFAULT '[]', `items` TEXT NOT NULL DEFAULT "{}", `multiples` INT NOT NULL DEAFULT 0, `language` TEXT NOT NULL DEFAULT "ko");
CREATE TABLE `items` ( `name` TEXT NOT NULL, `last_change` INT, `money` INT NOT NULL DEFAULT '0' , `change` INT NOT NULL DEFAULT '0');
CREATE TABLE `blacklist` (`id` TEXT NOT NULL, `time` INT NOT NULL, `why` TEXT NOT NULL DEFAULT 'none');
CREATE TABLE `stocks` ( `name` TEXT NOT NULL, `prices` TEXT NOT NULL DEFAULT '[100]', `lastchage` INT NOT NULL DEFAULT 0, `now` INT NOT NULL DEFAULT 100);
INSERT INTO `stocks`(`name`) VALUES ('wondercoin');
CREATE TABLE `info` (`stock` INT NOT NULL DEFAULT 0)
