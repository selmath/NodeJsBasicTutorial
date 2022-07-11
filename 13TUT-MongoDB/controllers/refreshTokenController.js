const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');

const handleRefreshToken = (req, res) => {
	const cookies = req.cookies;
	if(!cookies?.jwt) return res.sendStatus(401);
	console.log(cookies.jwt);
	const refreshToken = cookies.jwt;
	
	const foundUser = usersDB.users.find(usr => usr.refreshToken === refreshToken);
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