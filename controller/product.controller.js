// var db = require('../db.js');
var Product = require('../models/product.model');


module.exports.index = async (req,res) => {
	
	// var page= req.query.page || 1;
	// console.log(req.query.page);
	// var items = 10; //x

	// var begin = parseInt((page-1)*items);
	// var end = parseInt(page*items);

	// console.log(begin);
	// console.log(end);

	// var currentPage = parseInt(page);

	// console.log(db.get('products').slice(begin,end).value().length);

// 	res.render('products/index',{
// 		products : db.get('products').slice(begin,end).value(),
// 		// page : currentPage
// });

	var products = await Product.find();
		res.render('products/index',{
			products: products
		});

}

