var express = require('express');
var router = express.Router();
var gifController = require('../controllers/gifController')
var accessControl = require('../middlewares/accessControl');

/* Create gif post */
router.post('/post', accessControl.allowIfLoggedIn, accessControl.grantAcces('createOwn', 'gif'), gifController.createGif);

module.exports = router;