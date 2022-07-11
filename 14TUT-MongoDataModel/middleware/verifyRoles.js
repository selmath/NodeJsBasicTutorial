const verifyRoles = (...allowedRoles) => {
	return (req, res, next) =>{
		if(!req?.roles) return res.sendStatus(401); // Unauthorised
		const rolesArray = [...allowedRoles];
		console.log(rolesArray); // roles in allowed roles from db
		console.log(req.roles); // roles in jwt
		const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
		if(!result) return res.sendStatus(401);
		next();		
	}
}

module.exports = verifyRoles