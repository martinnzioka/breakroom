var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* Sign up */
router.post('/create-user', userController.signup);

/* Login
  Change route later
*/
router.post('/login', userController.login)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
