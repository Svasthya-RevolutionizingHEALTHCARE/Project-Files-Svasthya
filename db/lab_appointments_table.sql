USE svasthya_pro;

CREATE TABLE appointments(
  userID varchar(30) NOT NULL,
    testname varchar(50) NOT NULL,
    cityname varchar(30) NOT NULL,
    timings int NOT NULL,
    lab varchar(30) NOT NULL,
    day DATE NOT NULL,
    id char(100) PRIMARY KEY  NOT NULL
);

INSERT INTO appointments(userID,testname,cityname,timings,lab,day,id)
   VALUES ('harsha','bloodtest','chd','1700','lalpath','2021-04-29','bloodtestchd1700lalpath2021-04-29');

INSERT INTO appointments(userID,testname,cityname,timings,lab,day,id)
  VALUES ('amber','sugar','chd','1700',' DR LAL PATHLABS','2021-04-29','sugarchd1700 DR LAL PATHLABS2021-04-29');
