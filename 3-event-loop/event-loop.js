const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
setTimeout(() => console.log("Timer 1 finished"), 0);
setTimeout(() => console.log("Timer 2 finished"), 5000);
setImmediate(() => console.log("Immediate 1 finished"));
fs.readFile("./input.txt", 'utf8', (err, data) => {
    console.log('----');

    setTimeout(() => console.log("Timer 1-1 finished"), 0);
    setTimeout(() => console.log("Timer 2-1 finished"), 5000);
    setImmediate(() => console.log("Immediate 1-1 finished"));

    process.nextTick(()=>console.log('dasda'));
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });
});
console.log("Hello from the top-level code");