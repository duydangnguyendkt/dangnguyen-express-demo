// var db = require('../db.js')
var User = require('../models/user.model');
var md5 = require('md5');

module.exports.login = (req,res) => res.render('auth/login'); 

module.exports.postLogin = async (req,res,next) => {
	var name = req.body.name;
	var password = req.body.password;
	// De de kiem tra, mac dinh cho 1 tai khoan la user : user
	if ( name === 'user' && password === 'user')
	{
		res.cookie('userID','chidetestthoido',{
		signed: true
		});
		res.redirect('/users');

	}



	// var user = db.get('users').find({name : name}).value();
	var user = await User.findOne({name : name});

	if(user.length === 0)
	{
		res.render('auth/login',{
			errors: 'Name doesnt exsit',
			values: req.body
		})
		return;
	}

	var hashedPassword = md5(password);
	// hashedPassword
	if(user.password !== hashedPassword)
	{
		res.render('auth/login',{
			errors: 'Password incorrect',
			values: req.body
		})
		return;
	}

	res.cookie('userID',user.id,{
		signed: true
	});
	res.redirect('/users');


};