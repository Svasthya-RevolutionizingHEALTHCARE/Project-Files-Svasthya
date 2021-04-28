


var express = require('express');
var router = express.Router();
var db=require('../database');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/doctor-list', function(req, res, next) {
    var sql='SELECT * FROM doctors  ';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('doctor-list', { title: 'Doctor List', doctorData: data});
  });
});
module.exports = router;
