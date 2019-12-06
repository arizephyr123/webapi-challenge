const server = require('./server.js');

const port = 4001;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});