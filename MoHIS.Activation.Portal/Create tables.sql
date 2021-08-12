

CREATE TABLE appuser (
Id serial primary key,
Username text NOT NULL,
Password text NOT NULL,
Created timestamp NOT NULL,
Modified timestamp NOT NULL,
Deleted timestamp NULL
);


CREATE TABLE approle (
Id serial primary key,
Name text NOT NULL,
Description text,
Created timestamp NOT NULL,
Modified timestamp NOT NULL,
Deleted timestamp NULL
);

CREATE TABLE appuser_approle (
AppuserId integer not null REFERENCES appuser(Id),
ApproleId integer not null REFERENCES approle(Id)
);

CREATE TABLE apprule (
Id serial primary key,
Name text NOT NULL,
Description text,
Created timestamp NOT NULL,
Modified timestamp NOT NULL,
Deleted timestamp NULL
);

CREATE TABLE approle_apprule (
AppruleId integer not null REFERENCES apprule(Id),
ApproleId integer not null REFERENCES approle(Id)
);

CREATE TABLE customer (
Id serial primary key,
Name text NOT NULL,
Description text NOT NULL,
Code text NOT NULL,
Server text NULL,
number_of_devices integer NULL,
Created timestamp NOT NULL,
Modified timestamp NOT NULL,
Deleted timestamp NULL
);

CREATE TABLE appusercustomer (
AppuserId integer not null REFERENCES appuser(Id),
CustomerId integer not null REFERENCES customer(Id)
);

CREATE TABLE device (
Id serial primary key,
Customerid integer NULL REFERENCES customer(Id),
UUID text NOT NULL,
Description text NOT NULL,
last_connection timestamp NULL,
Created timestamp NOT NULL,
Modified timestamp NOT NULL,
Deleted timestamp NULL
);

CREATE TABLE transactionlog (
Id serial primary key,
AffectedTable text NOT NULL,
Type text NOT NULL,
Details text NOT NULL,
Created timestamp NOT NULL,
Modified timestamp NOT NULL,
Deleted timestamp NULL
);

CREATE TABLE appsession (
Id serial primary key,
AppuserId integer not null REFERENCES appuser(id),
token text NOT NULL,
validuntil timestamp NOT NULL,
Created timestamp NOT NULL,
Modified timestamp NOT NULL,
Deleted timestamp NULL

);

ALTER TABLE appuser OWNER TO dummy;
ALTER TABLE approle OWNER TO dummy;
ALTER TABLE appuser_approle OWNER TO dummy;
ALTER TABLE apprule OWNER TO dummy;
ALTER TABLE approle_apprule OWNER TO dummy;
ALTER TABLE customer OWNER TO dummy;
ALTER TABLE appusercustomer OWNER TO dummy;
ALTER TABLE device OWNER TO dummy;
ALTER TABLE transactionlog OWNER TO dummy;
ALTER TABLE appsession OWNER TO dummy;