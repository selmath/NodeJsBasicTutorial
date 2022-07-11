const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//initialize the object
const myEmitter = new MyEmitter();

//add listener to log
myEmitter.on('log', (msg) => {
	logEvents(msg);
});

//add timer
setTimeout(() => {
	myEmitter.emit('log', 'Log event emitted!');
}, 2000);
