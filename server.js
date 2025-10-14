const http = require('http');
const server = http.createServer((req,res)=>{
    res.end('Hi, NAZIM Welcomde to Node.js, that is server side JavaScript');
});
server.listen(3000, ()=>console.log('Server is running on 3000'));