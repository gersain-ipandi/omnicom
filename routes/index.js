var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./home/main', { title: 'Express' });
});

/* GET demande devis page. */
router.get('/demande_devis', function(req, res, next) {
  res.render('./devis/demande_devis', { title: 'Express' });
});

router.get('/destinations', function(req, res, next) {
  res.render('./home/destinations', { title: 'Express' });
});

router.get('/planings', function(req, res, next) {
  res.render('./home/planings', { title: 'Express' });
});

/* Admin routing */
router.get('/admin', function(req, res, next) {
  res.render('./admin/admin-login', { title: 'Express' });
});


module.exports = router;
