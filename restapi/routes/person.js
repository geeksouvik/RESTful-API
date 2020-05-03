var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  var query = 'select * from person';
  db.query(query, function(err, rows, fields) {
    if (err) throw err;
    //res.json(rows);
    res.render('person', { title: 'Person', person: rows});
  })
});

/*create product*/
router.get('/create-form', function(req, res, next) {
  res.render('createform', {title: 'Create Person'});
});

router.post('/create', function(req, res, next) {
  var name = req.body.name;
  var age = req.body.age;
  var gender = req.body.gender;
  var mobile= req.body.mobile;

  var sql = `INSERT INTO person (name, age, gender,mobile) VALUES ("${name}", "${age}", "${gender}","${mobile}")`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.redirect('/person');
  });
});

/*update product*/
router.get('/edit-form/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM person WHERE id=${id}`;
  db.query(sql, function(err, rows, fields) {
      res.render('editform', {title: 'Edit Person', person: rows[0]});
  });
});

router.post('/edit/:id', function(req, res, next) {
  var name = req.body.name;
  var age = req.body.age;
  var gender = req.body.gender;
  var mobile= req.body.mobile;
  var id = req.params.id;
  var sql = `UPDATE person SET name="${name}", age="${age}", gender="${gender}",mobile="${mobile}" WHERE id=${id}`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record updated!');
    res.redirect('/person');
  });
});

/*delete product*/
router.get('/delete/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  var sql = `DELETE FROM person WHERE id=${id}`;

  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record deleted!');
    res.redirect('/person');
  });
});

module.exports = router;
