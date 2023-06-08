# Mock Server DDL
USE yokai_external;

#####################
# DROP TABLES
#####################
DROP TABLE IF EXISTS                                                                              
    product, vending_machine_location;                                                                                                               #      
;

##########################
# PRODUCT
##########################
CREATE TABLE `product` (
  `product_id`          INT(11) NOT NULL AUTO_INCREMENT,
  `vending_machine_id`  VARCHAR(100) NOT NULL,
  `name`                VARCHAR(45) DEFAULT NULL,
  `price`               DOUBLE DEFAULT NULL,
  `description`         VARCHAR(45) DEFAULT NULL,
  `quantity`            INT(11) DEFAULT '0',
  `image`               VARCHAR(45) DEFAULT NULL,
  `more_info`           TEXT,
  `status`              VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `vending_machine_location` (
    `vm_location_id` INT(11) NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(100) NOT NULL,
    `vending_machine_id` VARCHAR(45) NOT NULL,
    `latitude` FLOAT NOT NULL,
    `longitude` FLOAT NOT NULL,
    `location_name` VARCHAR(100) NOT NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'ACT',
    PRIMARY KEY (`vm_location_id`)

) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;



INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('1', '401 E Millbrae Ave, Millbrae, CA 94030', '1b08e654-132d-473e-110d-56700e3cc612', '37.6025', '-122.378', 'ALOFT SFO');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('2', '120 S Wood Ave, Iselin, NJ 8830', '3b08e371-175d-473e-910a-32800e34c57d', '37.6025', '-74.3279', 'APA HOTEL NEW JERSEY');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('3', '351 Townes St Danville Va 24541', '8c01j374-219s-0o9d-98mc-42700e3ab66D', '36.5794', '-79.4154', 'AVERETTE ');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('4', '175 Forest St, Waltham, MA 02452', 'Zd03e354-225b-376k-9a0a-42700e34by4y', '42.3887', '-71.2221', 'BENTLEY COLLEGE');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('5', '4747 Arapahoe Ave, Boulder, CO 80303', 'Zds3e354-225b-376k-9a0a-42700e34by4y', '40.0163', '-105.2385', 'BOULDER COMMUNITY HEALTH');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('6', '147 N Brent St, Ventura, CA 93003', 'Zds3e354-225b-376k-9a0a-42700e3sghr3', '34.2745', '119.2596', 'COMMUNITY MEMORIAL HOSPITAL');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('7', 'Health Sciences Student Center (Aramark) 1868 Health Sciences Dr Greenville, NC  27834', '1b08e371-175d-321e-910a-32800e34c57d', '35.611', '-77.4083', 'EAST CAROLINA UNIVERSITY(ECU) 50 BOWL');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('8', 'Wright Place (Aramark) ECU Wright Building 1000 Wright Circle Greenville NC 27858', '4b08e371-175d-273e-910a-33400e34c57d', '35.6068', '-77.3662', 'EAST CAROLINA UNIVERSITY(ECU) 88 BOWL');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('9', '321 W KATEELLA AVE SUITE 448, ANAHEIM, CA 92802', '5b08e371-175d-499e-950a-32897e34c57d', '33.8036', '-117.9141', 'GARDEN WALK');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('10', '401 Main St, Black Hawk, CO 80422', '4h28e371-132d-433e-110a-32300e34c57d', '39.798', '-105.4856', 'ISLE CASINO');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('11', 'TOWERS MARKETPLACE 953 DANBY ROAD. ITHACA, NY 14850', '1b28e375-275d-473e-910d-32723e3af32d', '42.4206', '-76.4969', 'ITHACA COLLEGE');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('12', 'MALONE BUILDING 1 LMU DRIVE LOS ANGELES, CA 90045', '4b08e375-232d-473e-910d-32700e3ab61b', '33.971', '-118.418', 'LMU Loyola Maramount University');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('13', '51 Fulton St Poughkeepsie, NY 12601', '9b04e335-245d-423e-210d-34500e3ab61a', '41.7241', '-73.9296', 'MARIST COLLEGE');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('14', '3500 W Wheatland Rd, Dallas, TX 75237', 'odk32375-275d-473e-910d-32700ekd93jd', '32.6462', '-96.8793', 'METHODIST CHARLTON DALLAS');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('15', '1780 E University Ave, Las Cruces, NM 88003', '1b43g375-275d-473e-4fvd-32700e3246gf', '32.2847', '-106.747', 'NMSU (NEW MEXICO STATE F)');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('16', '3301 College Ave, Fort Lauderdale, FL 33314', '1b0ds375-3d5d-dsbe-r30d-4d70ds3ab61a', '26.0788', '-80.2423', 'NOVA SOUTHEASTERN UNIVERSITY');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('17', '2500 E AIRPORT DRIVE, ONTARIO CA 91761', '4b29e371-175d-233e-293a-23400edvc5sd', '34.0602', '-117.5994', 'ONTARIO AIRPORT TERMINAL 2');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('18', '2500 E AIRPORT DRIVE, ONTARIO CA 91761', '3b032dds-940b-323k-300a-20300e29dkgs', '34.0604', '-117.5902', 'ONTARIO AIRPORT TERMINAL 4');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('19', 'LOCATED AT OLYMPIC HOUSE (O HOUSE), 10000', 'bd033sd4-ds5b-sc6k-sd0a-427hy0eyhby4y', '34.0451', '-118.2678', 'PALISADES SKI RESORT (SQUAW VALLEY)');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('20', '593 Eddy St Providence, RI 02903', 'ab03v3kf-995b-396k-0a0a-430d0e23bjsk', '41.8107', '-71.4112', 'RHODE ISLAND LIFESPAN CHILDREN HOSPITAL');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('21', 'RISD RHODE ISLAND SCHOOL OF DESIGN', '93jdnvi9-275d-473e-910d-83udjvnw93kn', '41.827', '-71.4114', 'RISD RHODE ISLAND SCHOOL OF DESIGN');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('22', '171 COVINGTON BLOOMINGDALE, IL 60108', 'db0ds375-009c-323e-320d-sgv20e3ab61a', '41.9491', '-88.1259', 'RUSH UNIVERSITY MEDICAL CENTER');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('23', '135 4TH ST SAN FRANCISCO, CA 94103', 'qqq8e375-dddd-dd3e-dd0d-327eee3ee61a', '37.7843', '-122.4055', 'San Francisco METREON');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('24', '5001 GREAT AMERICA PKWY, SANTA CLARA CA 95054', '1b99e375-995d-333e-222d-32700e333333', '37.4048', '-121.9769', 'SANTA CLARA CONVENTION CENTER (SCCC)');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('25', '1701 Airport Blvd, San Jose, CA 95110', '2b33e375-328g-283e-01dd-ccc00e3ab61a', '37.3695', '-121.9319', 'SJC AIRPORT');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('26', '1451 Stadium Rd, Brookings, SD 57007', '33dde375-275d-mmmm-n10d-mmmm0e3mm61a', '44.3219', '-96.7859', 'SOUTH DAKOTA STATE UNIVERSITY');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('27', '1000 COL EILEEN COLLINS BLVD, SYRACUSE NY 13212', '1b08ed3a-bb5d-nr3e-a1dd-gv700e3dsgsc', '43.1142', '-76.1343', 'SYRACUSE AIRPORT 1.0');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('28', '1000 Col Eileen Collins Blvd, Syracuse, NY 13212', 'gg0dc375-275d-scfe-910d-sss00e4ab6ds', '43.1145', '-76.1157', 'SYRACUSE AIRPORT 1.2');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('29', '111 SOUTH 11TH STREET, PHILADELPHIA, PA, 19107', '2303e354-225b-344k-944a-44700444brsa', '39.9498', '-75.1602','THOMAS JEFFERSON');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('30', 'STUDENT UNION, 5100 CHERRY ST, KANSAS CITY, MO 64110', '7d03e999-443b-tttk-db0a-dkslchs896js', '39.0344', '-94.5832', 'UMKC DENTAL');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('31', 'Gengras Student Union, Hartford, CT 06105', 'bb03edb4-fffb-326k-ba0a-49999e34fy4y', '41.7964', '-72.7171', 'UNIVERSITY OF HARTFORD');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('32', 'WHITTEN UNIVERSITY CENTER 1350 MILLER DRIVE, CORAL GABLE , FL 33146', 'nnn3e354-225b-376k-9a0a-30fodmcjdsld', '25.7186', '-80.2808', 'UNIVERSITY OF MIAMI');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('33', '300 Monroe Ave, Scranton, PA 18510', '3333ess4-s25b-dd6k-sa0a-aaa00e34by4y', '41.4066', '-75.6588', 'UNIVERSITY OF SCRANTON');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('34', 'Fuquay Welcome Center Evansville, Indiana, USA', 'sssce354-ccss-376k-9a0a-fls93kdns827', '37.9628', '-87.6775', 'UNIVERSITY OF SOUTHERN INDIANA ');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('35', 'Harrington Complex Dining Hall, Courtney St, Newark, DE 19717', '9s08es75-sc5d-ccce-s00d-gg700e3ab6ss', '39.6757', '-75.7504', 'UNIVERSITY OF DELAWARE');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('36', '1740 W Taylor St, Chicago, IL 60612', '144dd37v-2vvd-v73e-v10d-3v00ve3vb61a', '41.8694', '-87.6727', 'UNIVERSITY OF ILLINOIS HEALTH CHICAGO (UIH)');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('37', 'HAHN UNIV CENTER  5998 ALCALA PARK, SAN DIEGO, CA 92110 ', 'jb08e3hh-ee5d-373e-bfff-ff70vesab61a', '32.7724', '-117.1898', 'UNIVERSITY OF SAN DIEGO');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('38', '414 E Clark St, Vermillion, SD 57069', '9304jf9v-osir-473e-v10d-kfjs9fjdnblf', '42.7858', '-96.9276', 'UNIVERSITY OF SOUTH DAKOTA');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('39', '12030 USF Beard Drive, Tampa, FL 33620', '3940dumc-dios-dje0-si9s-jsoc0jg0jrnl', '28.0597', '-82.4208', 'UNIVERSITY OF SOUTH FLORIDA JUNIPER');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('40', 'VHCHealth - 1701 N. George Mason Dr.  Arlington, VA 22205', 'ib08e375-275d-473e-9rrd-34700e009jdk', '38.8893', '-77.1301', 'VIRGINIA MEDICAL');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('41', '659 George StNew Haven, CT 06511', '2j09v375-275d-473d-340d-22490e49b619', '41.3064', '-72.9494', 'YALE MEDICAL');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('42', 'SM Marilao', '1b08e375-275d-473e-910d-32700e3ab61a', '15.1686', '120.58', 'SM Marilao');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('43', 'Sm Baliwag', '7b01j374-275b-373k-910a-42700e3ab66D', '14.9448', '120.89', 'Sm Baliwag');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('44', 'Sm Pampanga', '9d0323Zg-242t-t925-9000-p2o9245wDg25', '15.0526', '120.699', 'Sm Pampanga');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('45', 'Holy Angel University, Pampanga', '88wsF232-996z-9Y25-p002-5892Ip0Z21fB', '15.1331', '120.59', 'Holy Angel University, Pampanga');
INSERT INTO `yokai_external`.`vending_machine_location` (`vm_location_id`, `address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`) VALUES ('46', 'Sm Telabastagan, Pampanga', '1D45e0221-274b-876k-93sa-f892w31rW245A', '15.1212', '120.60', 'Sm Telabastagan, Pampanga');


INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('161 N Benton AveHelena, MT 59601', '123sF232-996z-93jg-p322-2odiv0dlsjrp', '46.5881', '-112.04', 'CARROLL COLLEGE', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('1071 Blue Hill Avenue, Milton, MA 02186', 'UQzqamve-xRZ1-9uF5-KSDq-1QPkz5a1pFpt', '42.233', '-71.1145', 'CURRY COLLEGE', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('10501 FGCU Blvd S, Fort Myers, FL 33965', 'fSZvGwL6-MxQ2-07ik-Whin-xkX84pxnwaB0', '26.4618', '-81.7716', 'FLORIDA GULF COAST UNIVERSITY', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('The Bronx, NY 10458, United States', 'SPVdw4Nv-oGZ3-AroK-mnea-wzi36q4YGcXk', '40.8671', '-73.8846', 'Fordham university ', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('637 College Ave, Lancaster, PA 17603', 'w3NPMqWJ-nugh-hDHG-IPmR-pc7X1Fu6PvnO', '40.0475', '-76.3179', 'FRANKLIN & MARSHALL UNIVERSITY ', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('4400 University Dr, Fairfax, VA 22030', 'nSCB7f4N-9Twe-bi14-viYW-bgr0n5vQZJmB', '38.8351', '-77.3079', 'GEORGE MASON UNIVERSITY', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('502 E Boone Ave, Spokane, WA 99258', '6YudXLqt-5Dok-cXYN-SLHE-o8Z6iLtEMOgK', '47.6659', '-117.4078', 'GONZAGA UNIVERSITY', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('27 Memorial Dr W, Bethlehem, PA 18015', 'viWsNR6w-Eldp-pMee-Bz07-drOIKxACFxJr', '40.6071', '-75.3808', 'Lehigh University PA ', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('701 College Rd, Lebanon, IL 62254', 'ZugNBfN5-vax7-S5yg-pYbh-0Lq9APyCsDjC', '38.6078', '-89.8157', 'McKendree University', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('18220 TX-249, Houston, TX 77070', 'gXmGVgOO-VBGp-jxe7-1LKs-Ok3LVIoN1646', '29.9661', '-95.5514', 'Methodist houston willowbrook ', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('360 Huntington Ave, Boston, MA 02115', 'di9Pgu5o-MtVW-eHV3-IiRG-kgZR7awoLpcp', '42.3398', '-71.0885', 'NORTHEASTERN UNIVERSITY ', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('1802 Colorado Ave, La Junta, CO 81050', 'BFp7t8mK-n9w2-pHNG-wvcy-TIUfOrcQdiav', '37.9684', '-103.5459', 'OTERO COLLEGE', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('1761 15th St Troy, NY 12180', 'ZJFgao36-dRQO-isuo-iEjJ-GwpN0m6vSdUz', '42.73', '-73.6766', 'RPI-Rensselaer Polytechnic Institute', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('1620 W Harrison St, Chicago, IL 60612', 'na799Qxp-oV8z-kWIk-iH87-FAC1heJzZNOu', '41.8747', '-87.6697', 'RUSH UNIVERSITY MEDICAL CENTER', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('501 E St Joseph St, Rapid City, SD 57701', 'G5G3dKBv-QOVV-nGoa-vBU9-8xaKfgFWejRB', '44.0755', '-103.2083', 'South Dakota School of Mines', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('700-732 E Cherry St, Vermillion, SD 57069', 'SECNhf5e-TC26-Xe19-pmfV-zACdyQUQyUgE', '42.7876', '-96.9211', 'UNIVERSITY OF SOUTH DAKOTA BEEDE BUMP', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('1200 University St, Spearfish, SD 57799', '7q9dX2Mo-ka98-b6Oh-hdkl-sX9WmjxaiXQb', '44.4966', '-103.8712', 'UNIVERSITY SOUTH DAKOTA BLACKHILL ', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('1002 N 1st St, Vincennes, IN 47591', '0NpTQ5lM-eNz8-INSh-DZVQ-7gRtSJRKrv8O', '38.6881', '-87.5214', 'Vincennes University', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('Sadler Center, 200 Stadium Dr, Williamsburg, VA 23185, United States', 'F7avc9ZN-6BCt-tIkw-ygP6-VZ4QbAoxymiC', '37.2718', '-76.7143', 'WILLIAM AND MARY ', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('44 West St, Worcester, MA 01609', 'LbDdz0MG-RlVn-jTl3-SlAY-v5SEEpPDDWHf', '42.2665', '-71.8092', 'WPI South Village', 'UPCOMING');
INSERT INTO `yokai_external`.`vending_machine_location` (`address`, `vending_machine_id`, `latitude`, `longitude`, `location_name`, `status`) VALUES ('486 Chandler St, Worcester, MA 01602', 'n7nvCEVg-ENS5-gvg5-8EUi-bo1xxox6CrR5', '42.2663', '-71.842', 'WSU -Worcester State University', 'UPCOMING');




##########################
# INSERT DEFAULT VALUES
##########################
INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e654-132d-473e-110d-56700e3cc612','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e654-132d-473e-110d-56700e3cc612','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e654-132d-473e-110d-56700e3cc612','Shio Ramen',14,'Pork Bone Broth',100,'ACT');


INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3b08e371-175d-473e-910a-32800e34c57d','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3b08e371-175d-473e-910a-32800e34c57d','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3b08e371-175d-473e-910a-32800e34c57d','TanTanmen',15,'Pork Bone Broth',100,'ACT');


INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('8c01j374-219s-0o9d-98mc-42700e3ab66D','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('8c01j374-219s-0o9d-98mc-42700e3ab66D','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('8c01j374-219s-0o9d-98mc-42700e3ab66D','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zd03e354-225b-376k-9a0a-42700e34by4y','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zd03e354-225b-376k-9a0a-42700e34by4y','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zd03e354-225b-376k-9a0a-42700e34by4y','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zds3e354-225b-376k-9a0a-42700e34by4y','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zds3e354-225b-376k-9a0a-42700e34by4y','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zds3e354-225b-376k-9a0a-42700e34by4y','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zds3e354-225b-376k-9a0a-42700e3sghr3','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zds3e354-225b-376k-9a0a-42700e3sghr3','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('Zds3e354-225b-376k-9a0a-42700e3sghr3','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e371-175d-321e-910a-32800e34c57d','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e371-175d-321e-910a-32800e34c57d','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e371-175d-321e-910a-32800e34c57d','Shio Ramen',14,'Pork Bone Broth',100,'ACT');


INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b08e371-175d-273e-910a-33400e34c57d','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b08e371-175d-273e-910a-33400e34c57d','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b08e371-175d-273e-910a-33400e34c57d','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('5b08e371-175d-499e-950a-32897e34c57d','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('5b08e371-175d-499e-950a-32897e34c57d','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('5b08e371-175d-499e-950a-32897e34c57d','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4h28e371-132d-433e-110a-32300e34c57d','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4h28e371-132d-433e-110a-32300e34c57d','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4h28e371-132d-433e-110a-32300e34c57d','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b28e375-275d-473e-910d-32723e3af32d','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b28e375-275d-473e-910d-32723e3af32d','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b28e375-275d-473e-910d-32723e3af32d','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b08e375-232d-473e-910d-32700e3ab61b','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b08e375-232d-473e-910d-32700e3ab61b','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b08e375-232d-473e-910d-32700e3ab61b','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9b04e335-245d-423e-210d-34500e3ab61a','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9b04e335-245d-423e-210d-34500e3ab61a','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9b04e335-245d-423e-210d-34500e3ab61a','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('odk32375-275d-473e-910d-32700ekd93jd','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('odk32375-275d-473e-910d-32700ekd93jd','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('odk32375-275d-473e-910d-32700ekd93jd','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b43g375-275d-473e-4fvd-32700e3246gf','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b43g375-275d-473e-4fvd-32700e3246gf','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b43g375-275d-473e-4fvd-32700e3246gf','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b0ds375-3d5d-dsbe-r30d-4d70ds3ab61a','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b0ds375-3d5d-dsbe-r30d-4d70ds3ab61a','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b0ds375-3d5d-dsbe-r30d-4d70ds3ab61a','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b29e371-175d-233e-293a-23400edvc5sd','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b29e371-175d-233e-293a-23400edvc5sd','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('4b29e371-175d-233e-293a-23400edvc5sd','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3b032dds-940b-323k-300a-20300e29dkgs','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3b032dds-940b-323k-300a-20300e29dkgs','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3b032dds-940b-323k-300a-20300e29dkgs','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('bd033sd4-ds5b-sc6k-sd0a-427hy0eyhby4y','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('bd033sd4-ds5b-sc6k-sd0a-427hy0eyhby4y','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('bd033sd4-ds5b-sc6k-sd0a-427hy0eyhby4y','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('ab03v3kf-995b-396k-0a0a-430d0e23bjsk','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('ab03v3kf-995b-396k-0a0a-430d0e23bjsk','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('ab03v3kf-995b-396k-0a0a-430d0e23bjsk','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('93jdnvi9-275d-473e-910d-83udjvnw93kn','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('93jdnvi9-275d-473e-910d-83udjvnw93kn','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('93jdnvi9-275d-473e-910d-83udjvnw93kn','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('db0ds375-009c-323e-320d-sgv20e3ab61a','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('db0ds375-009c-323e-320d-sgv20e3ab61a','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('db0ds375-009c-323e-320d-sgv20e3ab61a','TanTanmen',15,'Pork Bone Broth',100,'ACT');


INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('qqq8e375-dddd-dd3e-dd0d-327eee3ee61a','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('qqq8e375-dddd-dd3e-dd0d-327eee3ee61a','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('qqq8e375-dddd-dd3e-dd0d-327eee3ee61a','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b99e375-995d-333e-222d-32700e333333','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b99e375-995d-333e-222d-32700e333333','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b99e375-995d-333e-222d-32700e333333','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2b33e375-328g-283e-01dd-ccc00e3ab61a','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2b33e375-328g-283e-01dd-ccc00e3ab61a','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2b33e375-328g-283e-01dd-ccc00e3ab61a','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('33dde375-275d-mmmm-n10d-mmmm0e3mm61a','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('33dde375-275d-mmmm-n10d-mmmm0e3mm61a','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('33dde375-275d-mmmm-n10d-mmmm0e3mm61a','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08ed3a-bb5d-nr3e-a1dd-gv700e3dsgsc','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08ed3a-bb5d-nr3e-a1dd-gv700e3dsgsc','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08ed3a-bb5d-nr3e-a1dd-gv700e3dsgsc','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('gg0dc375-275d-scfe-910d-sss00e4ab6ds','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('gg0dc375-275d-scfe-910d-sss00e4ab6ds','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('gg0dc375-275d-scfe-910d-sss00e4ab6ds','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2303e354-225b-344k-944a-44700444brsa','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2303e354-225b-344k-944a-44700444brsa','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2303e354-225b-344k-944a-44700444brsa','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('7d03e999-443b-tttk-db0a-dkslchs896js','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('7d03e999-443b-tttk-db0a-dkslchs896js','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('7d03e999-443b-tttk-db0a-dkslchs896js','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('bb03edb4-fffb-326k-ba0a-49999e34fy4y','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('bb03edb4-fffb-326k-ba0a-49999e34fy4y','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('bb03edb4-fffb-326k-ba0a-49999e34fy4y','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('nnn3e354-225b-376k-9a0a-30fodmcjdsld','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('nnn3e354-225b-376k-9a0a-30fodmcjdsld','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('nnn3e354-225b-376k-9a0a-30fodmcjdsld','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('sssce354-ccss-376k-9a0a-fls93kdns827','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('sssce354-ccss-376k-9a0a-fls93kdns827','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('sssce354-ccss-376k-9a0a-fls93kdns827','Shio Ramen',14,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9s08es75-sc5d-ccce-s00d-gg700e3ab6ss','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9s08es75-sc5d-ccce-s00d-gg700e3ab6ss','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9s08es75-sc5d-ccce-s00d-gg700e3ab6ss','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('144dd37v-2vvd-v73e-v10d-3v00ve3vb61a','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('144dd37v-2vvd-v73e-v10d-3v00ve3vb61a','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('144dd37v-2vvd-v73e-v10d-3v00ve3vb61a','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('jb08e3hh-ee5d-373e-bfff-ff70vesab61a','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('jb08e3hh-ee5d-373e-bfff-ff70vesab61a','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('jb08e3hh-ee5d-373e-bfff-ff70vesab61a','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9304jf9v-osir-473e-v10d-kfjs9fjdnblf','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9304jf9v-osir-473e-v10d-kfjs9fjdnblf','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9304jf9v-osir-473e-v10d-kfjs9fjdnblf','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3940dumc-dios-dje0-si9s-jsoc0jg0jrnl','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3940dumc-dios-dje0-si9s-jsoc0jg0jrnl','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('3940dumc-dios-dje0-si9s-jsoc0jg0jrnl','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('ib08e375-275d-473e-9rrd-34700e009jdk','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('ib08e375-275d-473e-9rrd-34700e009jdk','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('ib08e375-275d-473e-9rrd-34700e009jdk','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2j09v375-275d-473d-340d-22490e49b619','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2j09v375-275d-473d-340d-22490e49b619','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('2j09v375-275d-473d-340d-22490e49b619','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e375-275d-473e-910d-32700e3ab61a','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e375-275d-473e-910d-32700e3ab61a','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1b08e375-275d-473e-910d-32700e3ab61a','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('7b01j374-275b-373k-910a-42700e3ab66D','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('7b01j374-275b-373k-910a-42700e3ab66D','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('7b01j374-275b-373k-910a-42700e3ab66D','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9d0323Zg-242t-t925-9000-p2o9245wDg25','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9d0323Zg-242t-t925-9000-p2o9245wDg25','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('9d0323Zg-242t-t925-9000-p2o9245wDg25','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('88wsF232-996z-9Y25-p002-5892Ip0Z21fB','Shoyu Ramen',13,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('88wsF232-996z-9Y25-p002-5892Ip0Z21fB','Korean Seafood Jjampong',13,'Shrimp Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('88wsF232-996z-9Y25-p002-5892Ip0Z21fB','TanTanmen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1D45e0221-274b-876k-93sa-f892w31rW245A','Black Garlic Tonkotsu Ramen',15,'Pork Bone Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1D45e0221-274b-876k-93sa-f892w31rW245A','Chicken Udon',14,'Chicken Broth',100,'ACT');

INSERT INTO `yokai_external`.`product`
(`vending_machine_id`,`name`,`price`,`description`,`quantity`,`status`)
VALUES('1D45e0221-274b-876k-93sa-f892w31rW245A','Shio Ramen',14,'Pork Bone Broth',100,'ACT');