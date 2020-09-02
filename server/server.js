const http = require("http");
const data = require("../data/json");
const data2 = require("../data/json1");
const data3 = require("../data/json3");

const server = http.createServer((req, res) => {
    //解决跨域问题
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.writeHead(200, {
    'Content-Type': 'application/json'
    });
    if(req.url === '/'){
        res.end(JSON.stringify(data.data))
    }
    if(req.url === '/data'){
        res.end(JSON.stringify(data2.data))
    }
    
    if(req.url === '/data3'){
        res.end(JSON.stringify(data3.data))
    }
});

server.listen(3000, () => {
    console.log("server is running!")
})