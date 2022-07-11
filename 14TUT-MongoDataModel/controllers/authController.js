const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
	const {user, pwd} = req.body;
	if(!user || !pwd) return res.status(400).json({ 'message': 'Username and Password is required' });
	const foundUser = usersDB.users.find(usr => usr.username === user);
	if(!foundUser) return res.sendStatus(401); // Unauthorized
	// Evaluate User Password
	const match = await bcrypt.compare(pwd, foundUser.password)
	if(match){
		const roles = Object.values(foundUser.roles);
		// create JWTs
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
		const refreshToken = jwt.sign(
			{"username": foundUser.username},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);
		const otherUsers = usersDB.users.filter(us => us.username !== foundUser.username);
		const currentUser = {...foundUser, refreshToken};
		usersDB.setUsers([...otherUsers, currentUser]);
		await fsPromises.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'), 
			JSON.stringify(usersDB.users)
		);
		res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } );
		res.json({ accessToken });
	}else{
		res.sendStatus(401);
	}	
}

module.exports = { handleLogin };