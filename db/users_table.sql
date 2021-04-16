USE svasthya_pro;

CREATE TABLE users(
    userID varchar(15) PRIMARY KEY,
    user_password varchar(10) NOT NULL,
    userName varchar(20) NOT NULL,
    dob date NULL,
    contact varchar(10) NULL,
    emailid varchar(30) NOT NULL
);

INSERT INTO users(userID,user_password,userName,dob,contact,emailid) 
   VALUES ('harsha','1234','Harsh Kumar','2001-08-04','9256628414','harsha49code@gmail.com');