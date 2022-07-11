//Introduction and Common Js module
console.log("Hello! Welcome to NodeJs world")
//console.log(global)

/*const os = require('os')

console.log(os.homedir())
console.log(os.freemem())
console.log(os.version())
console.log(os.type())

console.log(__dirname)
console.log(__filename)*/

/*const path = require('path')
console.log(path)
console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))*/

/*const math = require('./math');
console.log(math.add(2,3));
console.log(math.substract(2,3));
console.log(math.multiply(2,3));
console.log(math.divide(2,3));*/

const {add, substract, divide, multiply} = require('./math');
console.log(add(2,3));
console.log(substract(2,3));
console.log(multiply(2,3));
console.log(divide(2,3));

