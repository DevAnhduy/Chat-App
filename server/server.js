const app = require('express')();
<<<<<<< Updated upstream
const loaders = require('./loaders/index');
const port = process.env.port || 3001;
=======
>>>>>>> Stashed changes
const server = require('http').createServer(app);

(async() => { // Start server
    await loaders(app);
    server.listen(__port, () => console.log(`Server started on:  ${__port}`));
})();