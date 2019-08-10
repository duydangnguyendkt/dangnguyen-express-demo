var express = require('express');
var router 	= express.Router();
var multer  = require('multer')

var controller = require('../controller/user.controller')
var validate = require('../validate/user.validate')

var upload 	= multer({ dest: './public/uploads/' })

router.get('/', controller.index)

router.get('/create', controller.create)

router.get('/search', controller.search)

router.get('/:id', controller.get)

router.post('/create',upload.single('avatar'),validate.postCreate,controller.postCreateUser)

module.exports = router;
