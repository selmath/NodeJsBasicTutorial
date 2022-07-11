const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const {user, pwd} = req.body;
	if(!user || !pwd) return res.status(400).json({ 'message': 'Username and Password is required' });
	
	// check for duplicate user name in mongo data base
	const dupUser = await User.findOne({ username: user }).exec();
	if(dupUser) return res.sendStatus(409);// conflict
	try{
		// encrypt password
		const hashedPwd = await bcrypt.hash(pwd, 10);
		
		// create and store the new user
		const result = await User.create({ 
			"username": user, 
			"password": hashedPwd 
		});
		console.log(result);
		res.status(201).json({ 'success': `New User ${user} created` });
	}catch{
		res.status(500).json({ 'message': err.message });
	}
	
}

module.exports = { handleNewUser }
