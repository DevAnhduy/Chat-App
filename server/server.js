const express = require('express');
global.root_path = require.main.path;
require('dotenv').config();
const port = process.env.port || 3001;
const loaders = require('./loaders/index');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const check_auth = require('./src/middleware/check-auth')
//app.use(express.static('./public'))

io.on('connection',(socket) => {
    console.log(socket.id)
})

app.get('/',check_auth,(req,res) => {
    res.sendFile(root_path + '/public/index.html');
})


const start_server = async () =>{
    
    await loaders(app);
    server.listen(port, () => console.log(`Server started on:  ${port}`));
}
start_server();

