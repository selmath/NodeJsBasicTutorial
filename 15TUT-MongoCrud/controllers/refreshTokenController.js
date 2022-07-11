const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {

	const cookies = req.cookies;
	if(!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;
	
	const foundUser = User.findOne({ refreshToken: refreshToken }).exec(); // you can use { refreshToken: refreshToken } instead { refreshToken: refreshToken } 																	if property name and variable name are same
	if(!foundUser) return res.sendStatus(403); // Forbidden
	// Evaluate jwt
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if(err || foundUser.username !== decoded.username ) return res.sendStatus(403);
					// create JWTs
			const roles = Object.values(decoded.roles);
			const accessToken = jwt.sign(
				{
					"UserInfo":{
						"username": foundUser.username,
						"roles": roles
					}
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '60s' }
			);
			res.json({accessToken});
		}
	);
}

module.exports = { handleRefreshToken };