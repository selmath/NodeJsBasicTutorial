const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) { this.users = data }
}
//const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
	const {user, pwd} = req.body;
	if(!user || !pwd) return res.status(400).json({ 'message': 'Username and Password is required' });
	const foundUser = usersDB.users.find(usr => usr.username === user);
	if(!foundUser) return res.sendStatus(401); // Unauthorized
	// Evaluate User Password
	if(pwd === foundUser.password){
		res.json({'success' : `User ${user} has logged in !`});
	}else{
		res.sendStatus(401);
	}	
}

module.exports = { handleLogin };