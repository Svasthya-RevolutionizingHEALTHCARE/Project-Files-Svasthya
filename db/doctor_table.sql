USE svasthya_pro;

CREATE TABLE doctors(
ID INT PRIMARY KEY,
fullName varchar(20),
emailAddress varchar(30),
doctortype varchar(30),
city varchar(20),
country varchar(20)

);

INSERT INTO doctors(ID,fullName,emailAddress,doctortype,city,country)
VALUES (1,"dhruv","dhruv@ymail.com","ENT","chd","india");

INSERT INTO doctors(ID,fullName,emailAddress,doctortype,city,country)
VALUES (2,"piyush","piyush@ymail.com","ENT","chd","india");

INSERT INTO doctors(ID,fullName,emailAddress,doctortype,city,country)
VALUES (3,"tushar","t@ymail.com","ENT","chd","india");

INSERT INTO doctors(ID,fullName,emailAddress,doctortype,city,country)
VALUES (4,"saksham","s@ymail.com","veterinarian","chd","india");

INSERT INTO doctors(ID,fullName,emailAddress,doctortype,city,country)
VALUES (5,"harsh","h@ymail.com","Radiologist","chd","india);

INSERT INTO doctors(ID,fullName,emailAddress,doctortype,city,country)
VALUES (6,"harshit","h@ymail.com","ENT","Delhi","india");

INSERT INTO doctors(ID,fullName,emailAddress,doctortype,city,country)
VALUES (7,"harry","h@ymail.com","ENT","chd","india");
