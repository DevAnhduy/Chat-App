const app = require('express')();
const loaders = require('./loaders/index');
const server = require('http').createServer(app);
require('tests/socketio')(server);
const cors = require('cors')

(async() => { // Start server
    await loaders(app);
    server.listen(__port, () => console.log(`Server started on:  ${__port}`));
})();