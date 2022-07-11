const User = require('../model/User');

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	
	if(!cookies?.jwt) return res.sendStatus(204); // No Content
	const refreshToken = cookies.jwt;
	
	const foundUser = await User.findOne({ refreshToken }).exec();	
	
	if(!foundUser){
		res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
		return res.sendStatus(204); // Forbidden
	}
	// Delete refresh token
	foundUser.refreshToken = '';
	const result = await foundUser.save();
	console.log(result);
	
	res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // secure: true for production which will only server https
	res.sendStatus(204);
}

module.exports = { handleLogout };