var express = require('express');
var router = express.Router();

var userController = require('../Controllers/userController');

router.post('/addbookmark', userController.addBookmark);

router.post('/deletebookmark', userController.deleteBookmark);

router.post('/getuserbookmarks', userController.getUserBookmarks);

module.exports = router;
