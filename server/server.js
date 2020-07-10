global.root_path = require.main.path;

const app = require('express')();
const loaders = require('./loaders/index');
const port = process.env.port || 3001;
const server = require('http').createServer(app);

(async () => { // Start server
    await loaders(app);
    server.listen(port, () => console.log(`Server started on:  ${port}`));
})();


    