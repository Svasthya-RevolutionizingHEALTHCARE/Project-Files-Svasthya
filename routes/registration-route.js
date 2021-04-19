var mysql = require('mysql');
var bodyParser = require('body-parser');
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

  var express = require('express');
  var router = express.Router();

  var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set("view engine",'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

router.get('/register', function(req, res, next) {
    res.render('registration-form');
  });


