CREATE TABLE `users` ( `id` TEXT NOT NULL  , `join` INT NOT NULL , `money` INT NOT NULL DEFAULT '0' , `money_cooldown` INT NOT NULL DEFAULT '0' , `badges` TEXT NOT NULL DEFAULT '[]', `items` TEXT NOT NULL DEFAULT "{}");
CREATE TABLE `items` ( `name` TEXT NOT NULL, `last_change` INT, `money` INT NOT NULL DEFAULT '0' , `change` INT NOT NULL DEFAULT '0');
CREATE TABLE `blacklist` (`id` TEXT NOT NULL, `time` INT NOT NULL, `why` TEXT NOT NULL DEFAULT 'none');

