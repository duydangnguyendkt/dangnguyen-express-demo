
module.exports.authLogin = (req,res,next) => {
	if(!req.signedCookies.userID)
	{
		res.redirect('auth/login');
		return;
	}

	next();
};