require('dotenv').config();

const { createServer } = require('http');
const port = process.env.PORT || 3000;

const server = createServer((req, res) => {
    return res.end('This is a response');
});

server.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
