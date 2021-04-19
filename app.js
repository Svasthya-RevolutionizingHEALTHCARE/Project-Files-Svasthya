var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');



var conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'root',      
  database: 'svasthya_pro' 
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;



var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set("view engine",'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'views')));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"views","login.html"));
});
app.post('/',function(req,res){
  res.sendFile(path.join(__dirname,"views","login.html"));
});

app.post('/auth',function(request,response){
    var username = request.body.userID;
  	var password = request.body.password;

    conn.query('SELECT * FROM users WHERE userID = ? AND user_password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				app.use(express.static(path.join(__dirname,'views2')));
        response.render('home',{user: username});
				
			} else {
				console.log('Incorrect Username and/or Password!');
        response.redirect('/');
			}			
			
		});

  
    
});





app.get('/register',function(req,res){
    res.sendFile(path.join(__dirname,"views","register.html"));
});

app.post('/register-user',function(request,response){
  var fullname = request.body.fullname;
  var username = request.body.userID;
  var password = request.body.password;
  var email = request.body.email;


  conn.query('INSERT INTO users(userID,user_password,userName,emailid) VALUES (?,?,?,?);', [username, password,fullname,email], function(error, results, fields) {
    response.redirect('/')
    
  });

});



app.listen(8080,function(){
    console.log("Server is listening on port 8080.");
});