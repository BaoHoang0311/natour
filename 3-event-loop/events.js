const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();



myEmitter.on('newSale',()=>{
    console.log('cho xanh');
});

myEmitter.on('newSale',()=>{
    console.log('cho vang');
});

myEmitter.on('newSale',(stock)=>{
    console.log('cho xanh '+ stock);
});

myEmitter.emit('newSale',9);

/////////////////////
class NewSaleClass extends EventEmitter{
    constructor(){
        super();
    }
}

const myEmitter1 =  new NewSaleClass();

myEmitter1.on('newSale1',(stock)=>{
    console.log(stock + ' con cho do ');
});

myEmitter1.emit('newSale1',9);

// Create Server
const server = http.createServer();

server.on('request',(req,res)=>{
    console.log("Request Received");
    console.log(req.url);
    res.end("Request Received 1");
})

server.on('request',(req,res)=>{
    console.log("Another Request");
})

server.on('close',()=>{
    console.log('Server closed');
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Waitting for requests");
})


