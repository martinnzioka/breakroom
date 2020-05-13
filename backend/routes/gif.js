const express = require('express');

const router = express.Router();
const gifController = require('../controllers/gifController');
const accessControl = require('../middlewares/accessControl');

/* Create gif post */
router.post('/post', accessControl.allowIfLoggedIn, accessControl.grantAcces('createOwn', 'gif'), gifController.createGif);

module.exports = router;
