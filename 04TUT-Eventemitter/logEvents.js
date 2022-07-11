const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// add function to log event
const logEvents = async (message) => {
	const logItem = format(new Date(), 'yyyyMMMdd\tHH:mm:ss') + '\t' + uuid() + '\t' + message + '\n';
	console.log(logItem);
	try{
		if(!fs.existsSync(path.join(__dirname, 'logs'))){
			await fsPromises.mkdir(path.join(__dirname, 'logs'));
		}
		await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventlog.txt'), logItem);;
	}catch(err){
		console.error(err);
	}
}

//export the function
module.exports = logEvents;