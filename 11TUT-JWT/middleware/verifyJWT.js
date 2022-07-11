const jwt = require('jsonwebtoken');
config = require('dotenv').config();

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if(!authHeader) return res.sendStatus(401); // un-authorized
	const accessToken = authHeader.split(' ')[1];
	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET,
		(err, decoded) => {
			console.error(err);
			if(err) return res.sendStatus(403); // Invalid Token
			req.user = decoded.username;
			next();
		}
	);
}

module.exports = verifyJWT;