const express = require('express');
const app = express();
const cookies_parse = require('cookie-parser');
app.use(cookies_parse());
global.root_path = require.main.path;
const loaders = require('./loaders/index');
require('dotenv').config();
const port = process.env.port || 3001;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const check_auth = require('./src/middleware/check-auth')

//#region CORS config
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})
//#endregion
io.on('connection',(socket) => {
    console.log('A user connected!')
})

app.get('/',(req,res) => {
   console.log(req.cookies.JWT)
   res.send('Check')
})

const start_server = async () =>{
    await loaders(app);
    server.listen(port, () => console.log(`Server started on:  ${port}`));
}
start_server();

