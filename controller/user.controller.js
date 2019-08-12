//var shortid = require('shortid')
// var db = require('../db.js')
var User = require('../models/user.model');
var md5 = require('md5');

module.exports.index = async (req,res) => {

	var users = await User.find();
	res.render('users/index',{
		users : users
	});
}

module.exports.create = (req,res) => res.render('users/create')

module.exports.search = async (req,res) => 
{
	var q = req.query.name.toLowerCase();

	// var matchedUser = db.get('users').value().filter(function(user){
	// 	return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	// })

	var matchedUser = User.find({name : q})

	res.render('users/index',
	{
		users : matchedUser
	})
}

module.exports.get = (req,res)=> 
{
	console.log(req.params.id);
	var postId = req.params.id;
	// var user = db.get('users').find({id: postId}).value();
	var user = User.find({id: postId});


	res.render('users/view',{
		abc : user
	})
}

module.exports.postCreateUser = (req,res) => 
{
	// req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').slice(1)
						.join('\\');
	var password = req.body.password;

	var hashedPassword = md5(password);

	req.body.password = hashedPassword;

	// db.get('users').push(req.body).write(); 
	User.create(req.body);
	
	res.redirect('/users')
} 