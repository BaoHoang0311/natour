
// console.log(arguments);
// module.exports
const C = require('./test-module-1.js')
const calc1 = new C ();
console.log(calc1.add(2,5));

// exports
const c = require('./test-module-2.js');
console.log(c.add(3,5));

const {add,multiply,divide} = require('./test-module-2.js');
console.log(add(3,5));

