const jwt = require('jsonwebtoken');
config = require('dotenv').config();

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // un-authorized
	const accessToken = authHeader.split(' ')[1];
	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET,
		(err, decoded) => {
			console.error(err);
			if(err) return res.sendStatus(403); // Invalid Token
			req.user = decoded.UserInfo.username;
			req.roles = decoded.UserInfo.roles;
			next();
		}
	);
}

module.exports = verifyJWT;