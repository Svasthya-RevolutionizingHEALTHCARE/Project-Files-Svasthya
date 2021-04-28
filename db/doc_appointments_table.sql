USE svasthya_pro;

CREATE TABLE doctors_appointment(
ID INT ,
userID varchar(30),
fullName varchar(20),
emailAddress varchar(30),
doctortype varchar(30),
city varchar(20),
country varchar(20),
timings INT NOT NULL,
day DATE NOT NULL,
mixedID char(200) PRIMARY KEY


);

INSERT INTO doctors_appointment(ID,userID,fullName,emailAddress,doctortype,city,country,timings,day,mixedID)
VALUES ("1","harsha","dhruv","dhruv@ymail.com","ENT","chd","india","1700","2021-04-29","1dhruvENTchdindia17002021-04-29");
