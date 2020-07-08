const express = require('express');
const app = express();
global.root_path = require.main.path;
const loaders = require('./loaders/index');
require('dotenv').config();
const port = process.env.port || 3001;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const encode_cookie = require('./src/utils/encode_cookie');
const request = require('request');
const User_Model = require('./src/models/user');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

//#region CORS config
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})
//#endregion
io.on('connection', (socket) => {
    console.log('A user connected!');
    const str_cookie = socket.handshake.headers.cookie;
    const user = encode_cookie(str_cookie);
    request.put(`http://localhost:3001/users/${user.user_id}/${socket.id}`);
    socket.on('/join-room', (data) => {
        socket.removeAllListeners('/send-message');
        socket.join(data.room_id);
        socket.on('/send-message/room', (msg) => {
            if(user.username){
                io.to(data.room_id).emit('/send-message/room', { sender: user.username, content: msg.content });
                request.post(`http://localhost:3001/chat/rooms/${data.room_id}/messages`).form({sender_id: user.user_id,content: msg.content});
            }
        })
    })
    socket.on('/chat/users', (body) => {
        socket.removeAllListeners('/send-messages/users');
        socket.on('/send-messages/users', (msg) => {
            if(user.username){
                User_Model.findById(ObjectID(body.receiver_id))
                    .select('username socket_id')
                    .exec()
                    .then(receiver => {
                        if (receiver){
                            io.to(receiver.socket_id).emit('/send-messages/users',{
                                sender: user.username,
                                content: msg.content
                            })
                            request.post(`http://localhost:3001/chat/users/${user.user_id}/messages`).form({
                                receiver_id: body.receiver_id,
                                content: msg.content
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
    })
})


const start_server = async () =>{
    await loaders(app);
    server.listen(port, () => console.log(`Server started on:  ${port}`));
}
start_server();

    