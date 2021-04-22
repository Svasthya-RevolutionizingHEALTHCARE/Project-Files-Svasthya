USE svasthya_pro;

CREATE TABLE appointments(
    testname varchar(50) NOT NULL,
    cityname varchar(30) NOT NULL,
    timings int NOT NULL,
    lab varchar(30) NOT NULL,
    id char(100) PRIMARY KEY  NOT NULL
);

INSERT INTO appointments(testname,cityname,timings,lab,id)
   VALUES ('bloodtest','chd','1700','lalpath','bloodtestchd1700lalpath');
