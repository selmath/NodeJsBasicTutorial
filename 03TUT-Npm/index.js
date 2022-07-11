const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyyMMMdd\tHH:mm:ss'));

console.log(uuid());

console.log('npm finished with date-fns and uuid module');