USE svasthya_pro;

CREATE TABLE doctor_appointments(
	uniqueID varchar(90) PRIMARY KEY NOT NULL,
	patient varchar(15) NOT NULL,
	Doctor_ID varchar(30) NOT NULL,
	appt_date DATE NOT NULL,
	appt_time INT NOT NULL
);
