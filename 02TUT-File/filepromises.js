const fspromises = require('fs').promises;
const path = require('path');

const fileops = async () => {
	try{
		const data = await fspromises.readFile(path.join(__dirname,'files','starter.txt'), 'utf8');
		console.log(data);
		console.log('Read completed');
		await fspromises.unlink(path.join(__dirname,'files','starter.txt'));
		console.log('Delete completed');
		await fspromises.writeFile(path.join(__dirname,'files','promisewrite.txt'), data); 
		console.log('Write completed');
		await fspromises.appendFile(path.join(__dirname,'files','promisewrite.txt'), '\n\nAppending completed');
		console.log('Append completed');
		await fspromises.rename(path.join(__dirname,'files','promisewrite.txt'),path.join(__dirname,'files','promisewritenew.txt'));
		console.log('Rename completed');
		const newdata = await fspromises.readFile(path.join(__dirname,'files','promisewritenew.txt'), 'utf8');
		console.log(newdata);
	}catch(err){
		console.error(err);
	}
}
fileops();

