const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// add function to log event
const logEvents = async (message, logName) => {
	const logItem = format(new Date(), 'yyyyMMMdd\tHH:mm:ss') + '\t' + uuid() + '\t' + message + '\n';
	console.log(logItem);
	try{
		if(!fs.existsSync(path.join(__dirname, '..','logs'))){
			await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
		}
		await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);;
	}catch(err){
		console.error(err);
	}
}

const logger = (req, res, next) => {
	logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
	console.log(`${req.method}: ${req.path}`);
	next();
}

//export the function
module.exports = { logger, logEvents };