var express = require('express');
var mysql = require('mysql2');  // can also use mysql module.
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var conn=require('./database');


// var indexRouter = require('./routes/index');
var doctorsRouter = require('./routes/doctors');

// var conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root1234',
//   database: 'svasthya_pro'
// });
//
// conn.connect(function(err) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });
// module.exports = conn;



var app = express();


// app.use('/', indexRouter);
app.use('/doctors', doctorsRouter);

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
//----------------------------------------global variables-----------------------------------------------//
// var doctortype="";
// var Cityname="";
//--------------------------------------------//
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});


app.post('/home', function(request, response) {
  var username = request.body.userID;
  var password = request.body.password;

  conn.query('SELECT * FROM users WHERE userID = ? AND user_password = ?', [username, password], function(error, results, fields) {
    if (results.length > 0) {
      app.use(express.static(path.join(__dirname, 'views2')));
      response.render('home', {
        user: username
      });

    } else {
      console.log('Incorrect Username and/or Password!');
      response.redirect('/');
    }

  });



});



//---------------REGISTER------------//

app.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.post('/register', function(request, response) {
  var fullname = request.body.fullname;
  var username = request.body.userID;
  var password = request.body.password;
  var email = request.body.email;


  conn.query('INSERT INTO users(userID,user_password,userName,emailid) VALUES (?,?,?,?);', [username, password, fullname, email], function(error, results, fields) {
    response.redirect('/')

  });

});

//--------------labtest-----------//

app.get("/labTest", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "labTest.html"));
});
app.post("/labTest", function(req, res) {
  var testname = req.body.TestID;
  var cityname = req.body.City;
  var timings = req.body.Timings;
  var lab=req.body.Lab;
  var date=req.body.Date;
  var user=req.body.userID;



  const id = testname + cityname + timings + lab+date;

  conn.query('SELECT * FROM appointments WHERE id = ?', [id], function(error, results, fields) {
    if (results.length > 0) {
      app.use(express.static(path.join(__dirname, 'views2')));
      res.sendFile(path.join(__dirname, "views", "failure.html"));

    } else {
      conn.query('INSERT INTO appointments(userID,testname,cityname,timings,lab,day,id) VALUES (?,?,?,?,?,?,?);', [user,testname, cityname, timings, lab,date, id], function(error, results, fields) {
        res.sendFile(path.join(__dirname, "views", "success.html"));

      });
    }
  });

});

//----------doctor---------//
app.get("/doctor", function(req, res) {
  res.sendFile(path.join(__dirname, "views", "doctor.html"));
});

app.post("/doctor/doctor-list", function(req, res) {
  var doctortype = req.body.DoctorType;
  var Cityname = req.body.City;
  var timings = req.body.Timings;





  conn.query('SELECT * FROM doctors WHERE doctortype = ? AND city = ?', [doctortype,Cityname], function(error, results, fields) {
    if (results.length > 0) {
      app.use(express.static(path.join(__dirname, 'views2')));
      res.render( "doctor-list",{
        doctorData:results
      });

    } else {

        res.sendFile(path.join(__dirname, "views", "failure_doc1.html"));


    }
  });

});

//---------------------------------doctor appointments---------------------//


// app.get("/doctors/doctor-list/Appointment",function(req,res){
//   res.sendFile(path.join(__dirname, "views", "success.html"));
// });

// app.get("/doctors/doctor-list/Appointment",function(req,res){
//
//   var fullName=req.body.fullName;
//
//   res.render("success",{
//     fullName_doc:fullName
//   });
// });

app.post("/doctors/doctor-list/Appointment",function(req,res){
  var ID_arr=req.body.ID;
  var fullName=req.body.fullName;
  var doctorType=req.body.doctorType;
  var button_id =req.body.button;
  var email=req.body.emailAddress;
  var city=req.body.city;
  var country=req.body.country;


  var pos;
  // var name;
  // console.log(body);
  // if(body.length===1 ){
  //   name=fullName;
  // }else{
  //   name=fullName[pos];
  // }

  if(ID_arr.length===1 ){
    res.render("success",{
      fullName_doc:fullName,
      ID_arr_doc:ID_arr,
      doctorType_doc:doctorType,
      email_doc:email,
      city_doc:city,
      country_doc:country
    });
  }
   else{
ID_arr.map(function(currentID,index){
  if(currentID.toString() === button_id.toString()){
    pos=index;
  }
});

res.render("success",{
  fullName_doc:fullName[pos],
  ID_arr_doc:ID_arr[pos],
  doctorType_doc:doctorType[pos],
  email_doc:email[pos],
  city_doc:city[pos],
  country_doc:country[pos]
});
}


console.log(req.body);

});

//------------------------------doctor appt check----------------------------------//

app.post("/doctors/doctor-list/Appointment/check",function(req,res){
  var doc_ID=req.body.ID;
  var fullName=req.body.fullName;
  var doctorType=req.body.doctorType;
  var timings=req.body.Timings;
  var userID =req.body.userID;
  var email=req.body.emailAddress;
  var city=req.body.city;
  var country=req.body.country;
  var date=req.body.Date;
  console.log(date);   //update the mixedID by adding date in it//

  var mixedID=doc_ID+fullName+doctorType+city+country+timings+date;








  conn.query('SELECT * FROM doctors_appointment WHERE mixedID = ?', [mixedID], function(error, results, fields) {
    if (results.length > 0) {
      // app.use(express.static(path.join(__dirname, 'views2')));
      res.sendFile(path.join(__dirname, "views", "failure_doc2.html"));
      // res.redirect("/doctors/doctor-list/Appointment/check");


    } else {
      conn.query('INSERT INTO doctors_appointment(ID,userID,fullName,emailAddress,doctortype,city,country,timings,day,mixedID) VALUES (?,?,?,?,?,?,?,?,?,?);', [doc_ID,userID,fullName,email,doctorType,city,country,timings,date,mixedID], function(error, results, fields) {
        res.sendFile(path.join(__dirname, "views", "success.html"));
        // res.render("success_doc",{userID:userID});

      });
    }
  });

});


app.listen(8080, function() {
  console.log("Server is listening on port 8080.");
});
