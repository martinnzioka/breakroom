var express = require('express');
var router = express.Router();
var admin = require('../controller/admin');

/* POST new user */
router.post('/create-user', admin.createUser);

module.exports = router