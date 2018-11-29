var express = require('express'),
	router = express.Router(),
	home = require('./home'),
	register = require('./register'),
	login = require('./login'),
	dashboard = require('./dashboard'),
	history = require('./history')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.get('/home', home)
router.get('/login', login)
router.get('/register', register)
router.get('/dashboard', dashboard),
router.get('/history', history)

router.post('/login', login)


module.exports = router;
