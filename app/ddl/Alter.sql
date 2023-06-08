##########################
# Newest always on top
##########################


##########################
# 01/03/2023  UPDATED vending machine location
##########################

ALTER TABLE `yokai_external`.`vending_machine_location` 
ADD COLUMN `status` VARCHAR(45) NOT NULL DEFAULT 'ACT' AFTER `location_name`;







##########################
# 12/31/2022  UPDATED vending machine location
##########################

ALTER TABLE `yokai_external`.`vending_machine_location` 
ADD COLUMN `location_name` VARCHAR(100) NOT NULL AFTER `longitude`;




##########################
# 12/23/2022  UPDATED THE USER TBL
##########################

ALTER TABLE `yokai`.`user` 
ADD COLUMN `birthday` VARCHAR(255) NULL AFTER `reward_percentage`,
ADD COLUMN `gender` VARCHAR(255) NULL AFTER `birthday`;






##########################
# 12/21/2022
##########################

ALTER TABLE `yokai`.`rewards` 
ADD COLUMN `source` VARCHAR(45) NULL DEFAULT 'Admin' AFTER `unique_key`;



