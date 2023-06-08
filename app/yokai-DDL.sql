# Yokai DDL
USE yokai;

#####################
# DROP TABLES
#####################
DROP TABLE IF EXISTS                                                                              
    coupon_validity,                                                                                                    #
    coupon_discount,                                                                                                    #
    coupon,                                                                                                             #
    product_order,                                                                                                      #
    `order`,                                                                                                            #
    product,                                                                                                            #
    payment,                                                                                                            #
    transaction_item,                                                                                                   #
    transaction,                                                                                                        #
    verification,
    external_login, 
    feedback_form,                                                                                                     #
    user,
    user_default_location,
    rewards,
    notification;                                                                                                               #      
;

#####################
# DROP VIEWS
#####################
DROP VIEW IF EXISTS invoice;

#####################
# USER
#####################
CREATE TABLE `user` ( 
    `user_id`                                       INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `email`                                         VARCHAR(255) NOT NULL,                                              #
    `password`                                      VARCHAR(255) NOT NULL,                                              #
    `first_name`                                    VARCHAR(255) DEFAULT NULL,                                          #
    `last_name`                                     VARCHAR(255) DEFAULT NULL,                                          #
    `phone_number`                                  VARCHAR(255) DEFAULT NULL,   
    `one_time_password`                             VARCHAR(255) DEFAULT NULL,
    `otp_request_time`                              INT(10) UNSIGNED DEFAULT NULL,                                        #
    `status`                                        VARCHAR(3) DEFAULT NULL,                                            # ACT (Active), INA (Inactive), SUS (Suspended), DEL (Deleted), INV (Invited)
    `who_added`                                     INT(10) UNSIGNED DEFAULT NULL,                                      # id of who added
    `who_updated`                                   INT(10) UNSIGNED DEFAULT NULL,                                      # id of who updated
    `when_added`                                    INT(10) UNSIGNED DEFAULT NULL,                                      # unix timestamp when added
    `timestamp`                                     INT(10) UNSIGNED DEFAULT NULL,                                      # unix timestamp when updated
    `check_pass`                                    VARCHAR(255) DEFAULT NULL,                                          #
    `date_deleted`                                  INT(10) UNSIGNED DEFAULT NULL,                                      #
    `reward_percentage`                             INT(10) UNSIGNED DEFAULT 0,                                      #
    `birthday`                                      VARCHAR(255) DEFAULT NULL,   
    `gender`                                        VARCHAR(255) DEFAULT NULL,   
    PRIMARY KEY                                     (`user_id`),                                                        #
    UNIQUE KEY                                      `email_UNIQUE`(`email`)                                             #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;    


#####################
# ExternalLogin
#####################
CREATE TABLE `external_login` ( 
    `externalId`                                   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `userId`                                       INT(10) UNSIGNED DEFAULT NULL,                                      #
    `email`                                        VARCHAR(255) DEFAULT NULL,                                          #
    `type`                                         VARCHAR(255) DEFAULT NULL,                                          #
    `status`                                       VARCHAR(5)   DEFAULT NULL,                                          #
    `sub`                                          VARCHAR(255) DEFAULT NULL,                                          #
    `date_deleted`                                 INT(10) UNSIGNED DEFAULT NULL,                                      #
    PRIMARY KEY                                    (`externalId`),                                                     # 
    UNIQUE KEY                                     `sub_UNIQUE`(`sub`)                                                 #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  

#####################
# FeedBackForm
#####################
CREATE TABLE `feedback_form` ( 
    `feedbackId`                                   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `name`                                         VARCHAR(255) DEFAULT NULL,                                          #
    `email`                                        VARCHAR(255) DEFAULT NULL,                                          #
    `reason`                                       VARCHAR(255) DEFAULT NULL,                                          #
    `description`                                  VARCHAR(255) DEFAULT NULL,                                          #
    `when_added`                                   INT(10) UNSIGNED DEFAULT NULL,                                      # unix timestamp when added
    `timestamp`                                    INT(10) UNSIGNED DEFAULT NULL,                                      # 
    PRIMARY KEY                                    (`feedbackId`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  



CREATE TABLE `user_default_location` (
  `default_location_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `vending_machine_id` VARCHAR(255) NOT NULL,
  CONSTRAINT `user_id_UNIQUE` UNIQUE (`user_id`),
  CONSTRAINT `location_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  PRIMARY KEY (`default_location_id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  


#####################
# ORDER
#####################
CREATE TABLE `order` (
  `order_id`        INT(10)   unsigned  NOT NULL AUTO_INCREMENT,
  `user_id`         INT(10)   unsigned  DEFAULT NULL,
  `quantity`        INT(11)             DEFAULT NULL,
  `total_cost`      DOUBLE              DEFAULT NULL,
  `status`          VARCHAR(32)         NOT NULL DEFAULT 'PENDING',
  `who_added`       INT(10) unsigned    DEFAULT NULL,
  `when_added`      INT(10) unsigned    DEFAULT NULL,
  `who_updated`     INT(10) unsigned    DEFAULT NULL,
  `timestamp`       INT(11)             DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_user_id` (`user_id`),
  CONSTRAINT `order_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;


#####################
# PRODUCT_ORDER
#####################
CREATE TABLE `product_order` (
  `product_order_id`    INT(10) unsigned  NOT NULL AUTO_INCREMENT,
  `product_id`          INT(10) unsigned  NOT NULL,
  `order_id`            INT(10) unsigned  NOT NULL,
  `quantity`            INT(10)           DEFAULT NULL,
  `vending_machine_id`  VARCHAR(100)      NOT NULL,
  `timestamp`           INT(11)           DEFAULT NULL,
  `when_added`          INT(11)           DEFAULT NULL,
  `who_added`           INT(11)           DEFAULT NULL,
  `who_updated`         INT(11)           DEFAULT NULL,
  PRIMARY KEY (`product_order_id`),
  KEY `product_order_product_id` (`product_id`),
  KEY `FK2enlqlbvrcvijyjxhbqfxub72` (`order_id`),
  CONSTRAINT `FK2enlqlbvrcvijyjxhbqfxub72` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;



#####################
# TRANSACTION
#####################
CREATE TABLE `transaction` (
  `transaction_id`  INT(11)       NOT NULL AUTO_INCREMENT,
  `code`            VARCHAR(255)  NOT NULL,
  `order_id`        INT(11)       DEFAULT NULL,
  `user_id`         INT(11)       DEFAULT NULL,
  `coupon_id`       INT(11)       DEFAULT NULL,
  `fees`            DOUBLE        DEFAULT NULL,
  `total`           DOUBLE        DEFAULT NULL,
  `timestamp`       INT(11)       DEFAULT NULL,
  `when_added`      INT(11)       DEFAULT NULL,
  `who_added`       INT(11)       DEFAULT NULL,
  `who_updated`     INT(11)       DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `UK_piu8sb2aby57a9iiuqe614hut` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;



#####################
# TRANSACTION_ITEM
#####################
CREATE TABLE `transaction_item` (
  `transaction_item_id` INT(11)       NOT NULL AUTO_INCREMENT,
  `transaction_id`      INT(11)       DEFAULT NULL,
  `product_id`          INT(11)       DEFAULT NULL,
  `item_description`    VARCHAR(255)  DEFAULT NULL,
  `item_price`          DOUBLE        DEFAULT NULL,
  `item_quantity`       INT(11)       DEFAULT NULL,
  `item_tax`            DOUBLE        DEFAULT NULL,
  `item_total_cost`     DOUBLE        DEFAULT NULL,
  `when_added`          INT(11)       DEFAULT NULL,
  `who_added`           INT(11)       DEFAULT NULL,
  `who_updated`         INT(11)       DEFAULT NULL,
  `timestamp`           INT(11)       DEFAULT NULL,
  PRIMARY KEY (`transaction_item_id`),
  KEY `FK1wc2dvhj3oos47in473fqi3q8` (`transaction_id`),
  CONSTRAINT `FK1wc2dvhj3oos47in473fqi3q8` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;


#####################   
# VERIFICATION      
#####################  
CREATE TABLE `verification`(    
    `verification_id`                               INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `verification_user_id`                          INT(10) UNSIGNED NOT NULL,                                          # Foreign Key
    `code`                                          VARCHAR(45) DEFAULT NULL,                                           #
    `type`                                          VARCHAR(45) DEFAULT NULL,                                           # Mobile/Email Verification
    `expiration_date`                               INT(10) UNSIGNED DEFAULT NULL,                                      # unix timestamp of expiration
    `status`                                        VARCHAR(3) DEFAULT NULL,                                            # ACT (Active), INA (Inactive), SUS (Suspended), DEL (Deleted), INV (Invited)
    `who_added`                                     INT(10) UNSIGNED DEFAULT NULL,                                      # id of who added
    `who_updated`                                   INT(10) UNSIGNED DEFAULT NULL,                                      # id of who updated
    `when_added`                                    INT(10) UNSIGNED DEFAULT NULL,                                      # unix timestamp when added
    `timestamp`                                     INT(10) UNSIGNED DEFAULT NULL,                                      # unix timestamp when updated
    `date_deleted`                                  INT(10) UNSIGNED DEFAULT NULL,
    PRIMARY KEY                                     (`verification_id`),                                                #
    CONSTRAINT `fk_verification_user_id`            FOREIGN KEY (`verification_user_id`)                                REFERENCES `user`(`user_id`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;    


#####################
# PAYMENT
#####################
CREATE TABLE `payment` (
  `payment_id`                                      INT(11) NOT NULL AUTO_INCREMENT,                                    # Primary Key
  `transaction_id`                                  INT(11) DEFAULT NULL,                                               # Foreign Key
  `pi_account_type`                                 VARCHAR(255) DEFAULT NULL,                                          #
  `pi_card_type`                                    VARCHAR(255) DEFAULT NULL,                                          #
  `pi_cardholder_name`                              VARCHAR(255) DEFAULT NULL,                                          #
  `pi_country_issuance`                             VARCHAR(255) DEFAULT NULL,                                          #
  `pi_credit_card_number`                           VARCHAR(255) DEFAULT NULL,                                          #
  `pi_expiration_date`                              VARCHAR(255) DEFAULT NULL,                                          #
  `pi_payment_type`                                 VARCHAR(255) DEFAULT NULL,                                          #
  `pi_transaction_origin`                           VARCHAR(255) DEFAULT NULL,                                          #
  `ti_amount`                                       VARCHAR(255) DEFAULT NULL,                                          #
  `ti_merchant`                                     VARCHAR(255) DEFAULT NULL,                                          #
  `ti_merchant_account`                             VARCHAR(255) DEFAULT NULL,                                          #
  `ti_processor_authorization_code`                 VARCHAR(255) DEFAULT NULL,                                          #
  `ti_settlement_batch`                             VARCHAR(255) DEFAULT NULL,                                          #
  `ti_status`                                       VARCHAR(255) DEFAULT NULL,                                          #
  `ti_transaction_date`                             VARCHAR(255) DEFAULT NULL,                                          #
  `ti_transaction_type`                             VARCHAR(255) DEFAULT NULL,                                          #
  `who_added`                                       INT(11) DEFAULT NULL,                                               # id of who added
  `who_updated`                                     INT(11) DEFAULT NULL,                                               # id of who updated
  `when_added`                                      INT(11) DEFAULT NULL,                                               # unix timestamp when added
  `timestamp`                                       INT(11) DEFAULT NULL,                                               # unix timestamp when updated
  PRIMARY KEY                                       (`payment_id`),                                                     #
  KEY `FK53qo12unt0o5flr83axs6v2i7`                 (`transaction_id`)                                                  #
) ENGINE=INNODB  DEFAULT CHARSET=UTF8MB4;


#####################
# COUPON
#####################
CREATE TABLE `coupon` (
  `coupon_id`                                       INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
  `coupon_code`                                     VARCHAR(8) DEFAULT NULL,                                            #
  `status`                                          VARCHAR(45) DEFAULT 'NEW',                                 #
  `who_added`                                       INT(10) UNSIGNED DEFAULT NULL,                                      # id of who added
  `who_updated`                                     INT(10) UNSIGNED DEFAULT NULL,                                      # id of who updated
  `when_added`                                      INT(10) UNSIGNED DEFAULT NULL,                                      # unix timestamp when added
  `timestamp`                                       INT(10) UNSIGNED DEFAULT NULL,                                      # unix timestamp when updated
  PRIMARY KEY                                       (`coupon_id`),                                                      #
  UNIQUE KEY                                        `coupon_code_UNIQUE` (`coupon_code`)                                #
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;


#####################
# COUPON_DISCOUNT
#####################
CREATE TABLE `coupon_discount` (
  `coupon_discount_id`                              INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
  `coupon_id`                                       INT(10) UNSIGNED NOT NULL,                                          # Foreign Key
  `amount`                                          INT(10) UNSIGNED DEFAULT NULL,                                      #
  `percentage`                                      INT(10) UNSIGNED DEFAULT NULL,                                      #
  PRIMARY KEY                                       (`coupon_discount_id`),                                             #
  CONSTRAINT `coupon_discount_fk`                   FOREIGN KEY (`coupon_id`)                                           REFERENCES `coupon` (`coupon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

#####################
# COUPON_VALIDITY
#####################
CREATE TABLE `coupon_validity` (
  `coupon_validity_id`                              INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
  `coupon_id`                                       INT(10) UNSIGNED NOT NULL,                                          # Foreign Key
  `times_used`                                      INT(10) UNSIGNED DEFAULT NULL,                                      #
  `expiration_date`                                 INT(10) UNSIGNED DEFAULT NULL,                                      #
  PRIMARY KEY                                       (`coupon_validity_id`),                                             #
  CONSTRAINT `coupon_validity_fk`                   FOREIGN KEY (`coupon_id`)                                           REFERENCES `coupon` (`coupon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

#####################
# REWARDS / OFFERS & DEALS
#####################
CREATE TABLE `rewards` ( 
    `rewards_id`                                   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `user_id`                                      INT(10) DEFAULT NULL,                                               #
    `percentage`                                   INT(10) DEFAULT NULL,                                               #
    `status`                                       VARCHAR(255) DEFAULT NULL,                                          #
    `unique_key`                                   VARCHAR(10) DEFAULT NULL,                                          #
    `source`                                       VARCHAR(45) DEFAULT NULL,                                          #
    PRIMARY KEY                                    (`rewards_id`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  

##########################
# INSERT DEFAULT VALUES FOR REWARDS
##########################
INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('2', '20', 'notClaimed', '1029473829', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('2', '10', 'notClaimed', '4357642468', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('2', '25', 'notClaimed', '1346480875', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('2', '30', 'notClaimed', '4368359054', 'Admin');


INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('3', '20', 'notClaimed', '3252785321', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('3', '10', 'notClaimed', '4938273947', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('3', '25', 'notClaimed', '8493827391', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('3', '30', 'notClaimed', '4830293749', 'Admin');


INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('4', '20', 'notClaimed', '4738493029', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('4', '10', 'notClaimed', '3029371837', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('4', '25', 'notClaimed', '3840293847', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('4', '30', 'notClaimed', '2323232233', 'Admin');


INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('5', '20', 'notClaimed', '4535242422', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('5', '10', 'notClaimed', '4245423133', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('5', '25', 'notClaimed', '4356352411', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('5', '30', 'notClaimed', '5536674322', 'Admin');


INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('6', '20', 'notClaimed', '4564345563', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('6', '10', 'notClaimed', '4829394820', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('6', '25', 'notClaimed', '9897989898', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('6', '30', 'notClaimed', '0974826384', 'Admin');


INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('7', '20', 'notClaimed', '4933940293', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('7', '10', 'notClaimed', '4929893098', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('7', '25', 'notClaimed', '4389208472', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('7', '30', 'notClaimed', '5959493729', 'Admin');


INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('8', '20', 'notClaimed', '2030482838', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('8', '10', 'notClaimed', '3920182049', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('8', '25', 'notClaimed', '4920202839', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('8', '30', 'notClaimed', '3930584037', 'Admin');


INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('9', '20', 'notClaimed', '5353334433', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('9', '10', 'notClaimed', '1111112221', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('9', '25', 'notClaimed', '2232212232', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('9', '30', 'notClaimed', '5554565455', 'Admin');


INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('10', '20', 'notClaimed', '6567535678', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('10', '10', 'notClaimed', '5463578797', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('10', '25', 'notClaimed', '5435578535', 'Admin');

INSERT INTO `yokai`.`rewards` (`user_id`, `percentage`, `status`, `unique_key`,`source`)
VALUES ('10', '30', 'notClaimed', '6545353567', 'Admin');



#####################
# NOTIFICATION
#####################
CREATE TABLE `notification` ( 
    `notifId`                                      INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `user_id`                                      INT(10) DEFAULT NULL,                                               #
    `category`                                     VARCHAR(45) DEFAULT NULL,                                               #
    `title`                                        VARCHAR(255) DEFAULT NULL,                                          #
    `descriptionTitle`                             VARCHAR(255) DEFAULT NULL,                                          #
    `description`                                  VARCHAR(455) DEFAULT NULL,                                          #
    `path`                                         VARCHAR(255) DEFAULT NULL,                                          #
    `createdAt`                                    VARCHAR(45) DEFAULT NULL,                                          #
    `image`                                        VARCHAR(455) DEFAULT NULL,                                          #
    `seen`                                         INT(1) DEFAULT 0,                                          #
    PRIMARY KEY                                    (`notifId`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;

##########################
# INSERT DEFAULT VALUES FOR NOTIFICATION
##########################
INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('2', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('2', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('2', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('2', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('2', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('2', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');


INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('3', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('3', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('3', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('3', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('3', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('3', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');



INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('4', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('4', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('4', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('4', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('4', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('4', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');



INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('5', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('5', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('5', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('5', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('5', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('5', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');



INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('6', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('6', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('6', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('6', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('6', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('6', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');




INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('7', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('7', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('7', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('7', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('7', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('7', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');



INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('8', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('8', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('8', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('8', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('8', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('8', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');


INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('9', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('9', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('9', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('9', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('9', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('9', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');



INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('10', 'Advisory', 'Yo-Kai Virtual Card Advisory!', 'Additional Fee' , 'Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.','','1663689762','https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('10', 'Offer', 'Hello, Just Ramen In! ', 'Battle of the Ramen King! ' , 'Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!','','1663667566','https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('10', 'Tip', 'Learn About Safety! ', 'Always Wear your Face-Mask!' , 'Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.','','1663663966','https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('10', 'Offer', 'Enjoy Deals & More!', 'Last Day to Score the Biggest Sale Ever' , 'Order now and enjoy $3 off with code YOKAIDEALS!','','1663581166','https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('10', 'Offer', 'Hooray, it is Pay-Yay! ', 'Buy and Save!' , 'From bills and payments to orders and cravings, be stress-free with ease! Check out these Offers and Deals just for you!','','1663220360','https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9', '0');

INSERT INTO `yokai`.`notification` (`user_id`, `category`, `title`, `descriptionTitle`, `description`, `path`, `createdAt`, `image`, `seen`)
VALUES ('10', 'New Product', 'Gourmet Taste!', 'Tonkatsu Ramen!' , 'We are excited to introduce our new ramen product! This product is made with high quality ingredients and has a delicious flavor that we know you will love. We are confident that this product will be a hit with customers and we hope you will give it a try.!','','1661152413','https://img.freepik.com/premium-photo/ramen-noodles-pork-bone-soup-with-roast-pork-egg-tonkotsu-ramen-noodles-japanese-food-style_1339-165996.jpg?w=1380', '0');



#####################
# USER DISCOUNT
#####################
CREATE TABLE `user_discount_percentage` ( 
    `discount_id`                                   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `user_id`                                      INT(10) NOT NULL UNIQUE,                                                #
    `percentage`                                   INT(10) DEFAULT NULL,                                               #
    PRIMARY KEY                                    (`discount_id`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  


#####################
# USER LOYALTY
#####################
CREATE TABLE `loyalty_points` ( 
    `loyalty_id`                                   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `user_id`                                      INT(10) NOT NULL UNIQUE,                                               #
    `loyalty_points`                               INT(10) DEFAULT NULL,                                               #
    PRIMARY KEY                                    (`loyalty_id`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  


#####################
# USER TOTAL MONEY SPENT
#####################
CREATE TABLE `customer_total_money_spent` ( 
    `customer_total_money_spent_id`                INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `user_id`                                      INT(10) NOT NULL UNIQUE,                                               #
    `total_spending`                               INT(10) DEFAULT NULL,                                               #
    PRIMARY KEY                                    (`customer_total_money_spent_id`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  



#####################
# USER LOYALTY REWARDS
#####################
CREATE TABLE `loyalty_rewards` ( 
    `loyalty_reward_id`                              INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `percent`                                        INT(10) DEFAULT NULL,                                          #
    `points`                                         INT(10) DEFAULT NULL,                                               #
    `unique_key`                                     VARCHAR(10) DEFAULT NULL,                                               #
    `tier`                                           INT(10) DEFAULT NULL,                                               #
    PRIMARY KEY                                    (`loyalty_reward_id`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  



#####################
# INSERT LOYALTY REWARDS
#####################
INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('1', '50', '323465754', '1');

INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('5', '100', '564674678', '1');

INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('10', '150', '938463827', '1');


INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('2', '50', '435468643', '2');

INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('7', '100', '786534567', '2');

INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('12', '150', '457349876', '2');



INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('5', '50', '565646510', '3');

INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('10', '100', '750476321', '3');

INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('15', '150', '360987980', '3');


INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('10', '50', '564876987', '4');

INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('20', '100', '098574839', '4');

INSERT INTO `yokai`.`loyalty_rewards` (`percent`, `points`, `unique_key`, `tier`)
VALUES ('30', '150', '294759483', '4');


INSERT INTO `yokai`.`coupon` (`coupon_code`, `status`, `who_added`, `who_updated`)
VALUES 
('1d1d1d1d', 'NEW', '1', '1'),
('2b2b2b2b', 'NEW', '1', '1'),
('3c3c3c3c', 'NEW', '1', '1'),
('1f1f1f1f', 'NEW', '1', '1'),
('1e1e1e1e', 'NEW', '1', '1'),
('1s1s1s1s', 'NEW', '1', '1')
;

INSERT INTO `yokai`.`coupon_discount` (`coupon_id`, `amount`, `percentage`)
VALUES 
('1', '10', '1'),
('2', '20', '1'),
('3', '30', '1'),
('4', null, '1'),
('5', null, '1'),
('6', null, '1')
;

INSERT INTO `yokai`.`coupon_validity` (`coupon_validity_id`, `coupon_id`, `times_used`, `expiration_date`) VALUES ('1', '1', '100', '1749224908');
INSERT INTO `yokai`.`coupon_validity` (`coupon_validity_id`, `coupon_id`, `times_used`, `expiration_date`) VALUES ('2', '2', '100', '1749224908');
INSERT INTO `yokai`.`coupon_validity` (`coupon_validity_id`, `coupon_id`, `times_used`, `expiration_date`) VALUES ('3', '3', '100', '1749224908');
INSERT INTO `yokai`.`coupon_validity` (`coupon_validity_id`, `coupon_id`, `times_used`, `expiration_date`) VALUES ('4', '4', '100', '1749224908');
INSERT INTO `yokai`.`coupon_validity` (`coupon_validity_id`, `coupon_id`, `times_used`, `expiration_date`) VALUES ('5', '5', '100', '1749224908');
INSERT INTO `yokai`.`coupon_validity` (`coupon_validity_id`, `coupon_id`, `times_used`, `expiration_date`) VALUES ('6', '6', '100', '1749224908');

#####################
# USER LOYALTY REWARDS
#####################
CREATE TABLE `favorites` ( 
    `favorites_id`                              INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `user_id`                                        INT(10) DEFAULT NULL,                                          #
    `vending_machine_id`                             VARCHAR(60) NOT NULL,                                               #
    `location_name`                                  VARCHAR(255) DEFAULT NULL,                                               #
    PRIMARY KEY                                    (`favorites_id`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  




#####################
# LOYALTY TIER LIST
#####################
CREATE TABLE `loyalty_tier_list` ( 
    `loyalty_tier_list_id`                        INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                           # Primary Key
    `tier_name`                                    VARCHAR(255) NOT NULL,                                               #
    `tier_color`                                   VARCHAR(10) DEFAULT NULL,                                               #
    `tier_lowest_money_spent`                      INT(10) DEFAULT NULL,                                               #
    `tier_highest_money_spent`                      INT(10) DEFAULT NULL,                                               #
    `tier_promotion_percent`                      INT(10) DEFAULT NULL,                                               #
    PRIMARY KEY                                    (`loyalty_tier_list_id`)                                                      #                                              #
) ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;  

#####################
# INSERT TIER LIST
#####################
INSERT INTO `yokai`.`loyalty_tier_list` (`loyalty_tier_list_id`, `tier_name`, `tier_color`, `tier_lowest_money_spent`, `tier_highest_money_spent`, `tier_promotion_percent`)
VALUES ('1', 'BRONZE', '#995a1c', '0', '500', '100');

INSERT INTO `yokai`.`loyalty_tier_list` (`loyalty_tier_list_id`, `tier_name`, `tier_color`, `tier_lowest_money_spent`, `tier_highest_money_spent`, `tier_promotion_percent`)
VALUES ('2', 'SILVER', '#969593', '501', '1000', '110');

INSERT INTO `yokai`.`loyalty_tier_list` (`loyalty_tier_list_id`, `tier_name`, `tier_color`, `tier_lowest_money_spent`, `tier_highest_money_spent`, `tier_promotion_percent`)
VALUES ('3', 'GOLD', '#fad869', '1001', '1500', '120');

INSERT INTO `yokai`.`loyalty_tier_list` (`loyalty_tier_list_id`, `tier_name`, `tier_color`, `tier_lowest_money_spent`, `tier_highest_money_spent`, `tier_promotion_percent`)
VALUES ('4', 'DIAMOND', '#07a1d9', '1501', '99999', '130');


CREATE  OR REPLACE VIEW `MobileWebUsers` AS
select `yokai`.`user`.`user_id` AS `user_id`,`yokai`.`user`.`email` AS `email`,`yokai`.`user`.`first_name` AS `first_name`,`yokai`.`user`.`last_name` AS `last_name`,`yokai`.`user`.`birthday` AS `birthday`,`yokai`.`user`.`gender` AS `gender`,`yokai`.`user`.`phone_number` AS `phone_number`,'' AS `Address`,`yokai`.`user`.`status` AS `status`,`yokai`.`user`.`who_added` AS `who_added`,`yokai`.`user`.`who_updated` AS `who_updated`,`yokai`.`user`.`when_added` AS `when_added`,`yokai`.`user`.`timestamp` AS `timestamp`,'Mobile' AS `origin` from `yokai`.`user` 
union 
select `yokai_web`.`user`.`user_id` AS `user_id`,`yokai_web`.`user`.`email` AS `email`,`yokai_web`.`user`.`first_name` AS `first_name`,`yokai_web`.`user`.`last_name` AS `last_name`,`yokai_web`.`user`.`birthday` AS `birthday`,`yokai_web`.`user`.`gender` AS `gender`,`yokai_web`.`user`.`phone_number` AS `phone_number`,`yokai_web`.`user`.`address` AS `address`,`yokai_web`.`user`.`status` AS `status`,`yokai_web`.`user`.`who_added` AS `who_added`,`yokai_web`.`user`.`who_updated` AS `who_updated`,`yokai_web`.`user`.`when_added` AS `when_added`,`yokai_web`.`user`.`timestamp` AS `timestamp`,'Web' AS `origin` from `yokai_web`.`user`;;

##########################
# INSERT DEFAULT VALUES
##########################
INSERT INTO `yokai`.`user` (`first_name`, `last_name`, `email`, `password`, `status`, `who_added`)
VALUES ('John', 'Doe', 'admin@yokaiexpress.com', '$2a$10$g/kHyfgw1vt1Imm3S8YnJeoUfV6mXXSLSlDF.B3Hhzf11jO1FnCd6', 'ACT', '1');
