const fs = require('fs');
const http = require('http');
const url = require('url');
const replacetemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');

// lập trình đồng bộ chạy 1 lần thôi ko sợ block execution
let data = fs.readFileSync('./data.json', 'utf-8');
const dataObj = JSON.parse(data);

let templateCard = fs.readFileSync('./templates/template-card.html', 'utf-8')
let templateOverView = fs.readFileSync('./templates/template-overview.html', 'utf-8')
let templateProduct = fs.readFileSync('./templates/template-product.html', 'utf-8')



const server = http.createServer((req, res) => {
    const abc = url.parse(req.url, true);
    const { query, pathname }  = abc;
    console.log(query, pathname);

    const z = dataObj.map(x=>slugify(x.productName,{lower:true}))
    console.log(z);

    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html',
            'trang': 'overview',
        })
        const cardHtml = dataObj.map(el => replacetemplate(templateCard, el)).join('');
        res.end(templateOverView.replace(/{%PRODUCT_CARDS%}/g, cardHtml));
    }
    else if (pathname === '/product') {
        let idx = dataObj.findIndex(x=>x.productName.toLowerCase() == query.id?.replaceAll(/-/g,' '));
        console.log('idx =============',idx)
        let obj = dataObj[idx];
        const cardproduct = replacetemplate(templateProduct, obj);
        res.end(cardproduct);
    }
    else if (pathname === '/api') {

    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'trang-thai': 'not found',
        })
        res.end("<h1>this is not found</h1>");
    }
})

server.listen(1000 , '127.0.0.1', () => {
    console.log("listening to server 1000");
})

//! Blocking, lập trình đồng bộ từ trên xuống dưới
// const textIn = ` abcd`;

// fs.appendFileSync(`${__dirname}\\input.txt`,textIn);
// let data = fs.readFileSync(`${__dirname}\\input.txt`,'utf8');

// fs.appendFileSync(`${__dirname}/txt/input.txt`,textIn);
// let data = fs.readFileSync('./txt/input.txt','utf8');
// console.log(data)

//!Non Blocking lập trình bất đồng bộ asynchornous
//! callback khác asynchornous, trong trường hợp readfile thì tụi nó vô tình trùng với nhau thôi
// fs.readFile('./txt/inputtttt.txt','utf8',(err,data)=>{
//     if(err) return console.log("boom")
//     console.log(data);
// })

