// var db = require('../db.js')
var User = require('../models/user.model');

module.exports.login = (req,res) => res.render('auth/login'); 

module.exports.postLogin = async (req,res,next) => {
	var name = req.body.name;
	var password = req.body.password;

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

	if(user.password !== password)
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