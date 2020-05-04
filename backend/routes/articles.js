var express = require('express');
var router = express.Router();
var articleController = require('../controllers/articleController')
var accessControl = require('../middlewares/accessControl');

/* Create article */
router.post('/post', accessControl.allowIfLoggedIn, accessControl.grantAcces('createOwn', 'fu-relation'), articleController.createArticle);

/* Update article */
router.patch('/:article_id', accessControl.allowIfLoggedIn, accessControl.grantAcces('updateOwn', 'fu-relation'), articleController.updateArticle);

module.exports = router;