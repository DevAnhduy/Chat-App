const express = require('express');
global.root_path = require.main.path;
require('dotenv').config();
const port = process.env.port || 3001;
const loaders = require('./loaders/index');
const app = express();

const start_server = async () =>{
    await loaders(app);
    app.listen(port, () => console.log(`Server started on:  ${port}`));
}
start_server();
