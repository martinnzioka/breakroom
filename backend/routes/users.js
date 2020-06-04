const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

/* Sign up */
router.post('/create-user', userController.signup);

/* Login
  Change route later
*/
router.post('/login', userController.login);

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
