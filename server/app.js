const http = require('http');

const port = '8080';


const server = http.createServer((req, res) => {
    res.write('Hello, This is Server');
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})