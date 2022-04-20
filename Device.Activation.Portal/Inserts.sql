INSERT into appuser (username, password, created, modified) values ('test', 'test', current_timestamp, current_timestamp);

insert into apprule(name, description, created, modified) values ('settings', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('settings-change-password', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('device-add', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('device-update', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('device-remove', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('device-admin', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('customer-add', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('customer-update', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('customer-remove', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('customer-admin', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('appuser', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('appuser-add', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('appuser-update', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('appuser-remove', null, current_timestamp,current_timestamp);
insert into apprule(name, description, created, modified) values ('appuser-admin', null, current_timestamp,current_timestamp);
--insert into apprule(name, description, created, modified) values ('settings', null, current_timestamp,current_timestamp);

insert into approle(name, description, created, modified) values ('admin', null, current_timestamp,current_timestamp);
insert into approle(name, description, created, modified) values ('roxit', null, current_timestamp,current_timestamp);
insert into approle(name, description, created, modified) values ('klant', null, current_timestamp,current_timestamp);

insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'settings'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'settings-change-password'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'device-add'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'device-update'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'device-remove'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'device-admin'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'customer-add'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'customer-update'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'customer-remove'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'customer-admin'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'appuser'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'appuser-add'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'appuser-update'));
insert into approle_apprule(approleid, appruleid) values ((SELECT id FROM approle WHERE name = 'admin'), (SELECT id FROM apprule WHERE name = 'appuser-remove'));

insert into appuser_approle(appuserid, approleid) values ((SELECT id FROM appuser WHERE username = 'test'), (SELECT id FROM approle WHERE name = 'admin'));



insert into customer ("name", description, code, number_of_devices, created, modified) values ('test', 'test', '101', 5, current_timestamp, current_timestamp);

insert into appusercustomer(appuserid, customerid) values ((SELECT Id FROM appuser WHERE username = 'test'),(SELECT Id FROM customer WHERE name = 'test'));

insert into device(customerid, uuid, description,created,modified) values((SELECT Id FROM customer WHERE name = 'test'), 'abcdefghijklmnopqrstuvwxyz', 'dummy device',current_timestamp,current_timestamp);

