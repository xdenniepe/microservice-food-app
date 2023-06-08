##########################
# January 04, 2022 / update the remaining zipcode to 2 location
##########################

UPDATE `yokai_external`.`vending_machine_location` SET `address` = '120 S Wood Ave, Iselin, NJ 8830' WHERE (`vending_machine_id` = '3b08e371-175d-473e-910a-32800e34c57d');
UPDATE `yokai_external`.`vending_machine_location` SET `address` = 'LOCATED AT OLYMPIC HOUSE (O HOUSE) 10000' WHERE (`vending_machine_id` = 'bd033sd4-ds5b-sc6k-sd0a-427hy0eyhby4y');



##########################
# January 04, 2022 / update the univ to University
##########################

UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'NMSU (NEW MEXICO STATE UNIVERSITY)' WHERE (`vm_location_id` = '15');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF HARTFORD' WHERE (`vm_location_id` = '31');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF MIAMI' WHERE (`vm_location_id` = '32');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF SCRANTON' WHERE (`vm_location_id` = '33');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF SOUTHERN INDIANA ' WHERE (`vm_location_id` = '34');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'NORTHEASTERN UNIVERSITY ' WHERE (`vm_location_id` = '57');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF SOUTH DAKOTA BEEDE BUMP' WHERE (`vm_location_id` = '62');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY SOUTH DAKOTA BLACKHILL ' WHERE (`vm_location_id` = '63');



##########################
# December 31, 2022 / added public locations of machines
##########################


UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'ALOFT SFO' WHERE (`vm_location_id` = '1');
UPDATE `yokai_external`.`vending_machine_location` SET `latitude` = '39.6684', `longitude` = '-83.8264', `location_name` = 'APA HOTEL NEW JERSEY' WHERE (`vm_location_id` = '2');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'AVERETTE ' WHERE (`vm_location_id` = '3');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'BENTLEY COLLEGE' WHERE (`vm_location_id` = '4');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'BOULDER COMMUNITY HEALTH' WHERE (`vm_location_id` = '5');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'COMMUNITY MEMORIAL HOSPITAL' WHERE (`vm_location_id` = '6');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'EAST CAROLINA UNIVERSITY(ECU) 50 BOWL' WHERE (`vm_location_id` = '7');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'EAST CAROLINA UNIVERSITY(ECU) 88 BOWL' WHERE (`vm_location_id` = '8');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'GARDEN WALK' WHERE (`vm_location_id` = '9');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'ISLE CASINO' WHERE (`vm_location_id` = '10');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'ITHACA COLLEGE' WHERE (`vm_location_id` = '11');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'LMU Loyola Maramount University' WHERE (`vm_location_id` = '12');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'MARIST COLLEGE' WHERE (`vm_location_id` = '13');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'METHODIST CHARLTON DALLAS' WHERE (`vm_location_id` = '14');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'NMSU (NEW MEXICO STATE UNIV)' WHERE (`vm_location_id` = '15');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'NOVA SOUTHEASTERN UNIVERSITY' WHERE (`vm_location_id` = '16');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'ONTARIO AIRPORT TERMINAL 2' WHERE (`vm_location_id` = '17');
UPDATE `yokai_external`.`vending_machine_location` SET `address` = '2900 E AIRPORT DRIVE, ONTARIO CA 91761', `longitude` = '-117.5898', `location_name` = 'ONTARIO AIRPORT TERMINAL 4' WHERE (`vm_location_id` = '18');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'PALISADES SKI RESORT (SQUAW VALLEY)' WHERE (`vm_location_id` = '19');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'RHODE ISLAND LIFESPAN CHILDREN HOSPITAL' WHERE (`vm_location_id` = '20');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'RISD RHODE ISLAND SCHOOL OF DESIGN' WHERE (`vm_location_id` = '21');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'RUSH UNIVERSITY MEDICAL CENTER' WHERE (`vm_location_id` = '22');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'San Francisco METREON' WHERE (`vm_location_id` = '23');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'SANTA CLARA CONVENTION CENTER (SCCC)' WHERE (`vm_location_id` = '24');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'SJC AIRPORT' WHERE (`vm_location_id` = '25');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'SOUTH DAKOTA STATE UNIVERSITY' WHERE (`vm_location_id` = '26');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'SYRACUSE AIRPORT 1.0' WHERE (`vm_location_id` = '27');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'SYRACUSE AIRPORT 1.2' WHERE (`vm_location_id` = '28');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'THOMAS JEFFERSON' WHERE (`vm_location_id` = '29');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UMKC DENTAL' WHERE (`vm_location_id` = '30');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIV OF HARTFORD' WHERE (`vm_location_id` = '31');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIV OF MIAMI' WHERE (`vm_location_id` = '32');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIV OF SCRANTON' WHERE (`vm_location_id` = '33');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIV OF SOUTHERN INDIANA ' WHERE (`vm_location_id` = '34');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF DELAWARE' WHERE (`vm_location_id` = '35');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF ILLINOIS HEALTH CHICAGO (UIH)' WHERE (`vm_location_id` = '36');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF SAN DIEGO' WHERE (`vm_location_id` = '37');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF SOUTH DAKOTA' WHERE (`vm_location_id` = '38');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'UNIVERSITY OF SOUTH FLORIDA JUNIPER' WHERE (`vm_location_id` = '39');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'VIRGINIA MEDICAL' WHERE (`vm_location_id` = '40');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'YALE MEDICAL' WHERE (`vm_location_id` = '41');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'SM Marilao' WHERE (`vm_location_id` = '42');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'Sm Baliwag' WHERE (`vm_location_id` = '43');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'Sm Pampanga' WHERE (`vm_location_id` = '44');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'Holy Angel University, Pampanga' WHERE (`vm_location_id` = '45');
UPDATE `yokai_external`.`vending_machine_location` SET `location_name` = 'Sm Telabastagan, Pampanga' WHERE (`vm_location_id` = '46');














