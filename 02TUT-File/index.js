const fs = require('fs');
const path = require('path');
//console.log(fs)

fs.readFile(path.join(__dirname,'files','starter.txt'), 'utf8',(err, data) => {
	if (err) throw err;
	console.log(data);
})

console.log('File reading completed')

/*fs.writeFile(path.join(__dirname,'files','reply.txt'), 'Nice to meet you',(err) => {
	if (err) throw err;
	console.log('write complete');
})

fs.appendFile(path.join(__dirname,'files','test.txt'), 'Testing appending file',(err) => {
	if (err) throw err;
	console.log('append complete');
})*/

//call back chaining to control the flow
fs.writeFile(path.join(__dirname,'files','reply.txt'), 'Nice to meet you',(err) => {
	if (err) throw err;
	console.log('write complete');
	
	fs.appendFile(path.join(__dirname,'files','reply.txt'), '\n\nNice to Meet you too!',(err) => {
		if (err) throw err;
		console.log('append complete');
		fs.rename(path.join(__dirname,'files','reply.txt'), path.join(__dirname,'files','replynew.txt'),(err) => {
			if (err) throw err;
			console.log('rename complete');
		})
	})
})


//exit on uncaught error
process.on('uncaughtException', err => {
	console.error( 'There was an uncaught exception:', err);
	process.exit(1);
})