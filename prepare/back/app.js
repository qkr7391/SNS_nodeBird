const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.end('Hello Node');
});

// Start listening for incoming connections on port 3060
server.listen(3065, () => {
    console.log('Server is listening on port 3065');
});
