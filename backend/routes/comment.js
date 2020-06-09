const express = require('express');

const router = express.Router();
const commentController = require('../controllers/commentController');
const accessControl = require('../middlewares/accessControl');

/* Create comment */
router.post('/post', accessControl.allowIfLoggedIn, accessControl.grantAcces('createOwn', 'comment'), commentController.createComment);

module.exports = router;