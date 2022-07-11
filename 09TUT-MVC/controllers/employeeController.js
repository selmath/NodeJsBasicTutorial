const data = {
	employees: require('../model/employees.json'),
	setEmployee: function (data) { this.employees = data }	
};

const getAllEmployees = (req, res) => {
	res.json(data.employees);
}

const createNewEmployee = (req, res) => {
	const newEmployee = {
		id: data.employees[data.employees.length - 1].id + 1 || 1,
		firstname: req.body.firstname,
		lastname: req.body.lastname
	}
	
	if(!newEmployee.firstname || !newEmployee.lastname){
		return res.status(400).json({'message': 'First and last name is required'});
	}	
	data.setEmployee([...data.employees, newEmployee]);
	res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
	const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
	if(!employee){
		return res.status(400).json({ 'message':`Employee not found for id ${req.body.id}` });
	}
	if(req.body.firstname) employee.firstname = req.body.firstname;
	if(req.body.lastname) employee.lastname = req.body.lastname;
	const filteredArray = data.employees.filter(emp => emp.id !== parseInt(employee.id));
	const unsortedArray = [...filteredArray, employee];
	data.setEmployee(unsortedArray.sort((a,b) => a.id > b.id ? 1: a.id < b.id ? -1: 0));
	res.status(201).json(data.employees);	
}

const deleteEmployee = (req, res) => {
	const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
	if(!employee){
		return res.status(400).json({ 'message':`Employee not found for id ${req.body.id}` });
	}
	const filteredArray = data.employees.filter(emp => emp.id !== parseInt(employee.id));
	data.setEmployee([...filteredArray]);
	res.status(201).json(data.employees);	
}

const getEmployee = (req, res) => {
	const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
	if(!employee){
		return res.status(400).json({ 'message':`Employee not found for id ${req.params.id}` });
	}
	res.status(200).json(employee);
}

module.exports = {
	getAllEmployees,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee
}
