const io = require('src/socket.io/socket.io')(server);
const encode_jwt_token = require('src/utils/encode_jwt_token');
const request = require('src/socket.io/request');
const User_Model = require('src/models/user');
const { ObjectID } = require('src/socket.io/mongodb');

// io.on('connection',(socket) => {
//     console.log('A user connected!');;
//     const jwt_token = socket.handshake.query.authorization;
//     const user = encode_jwt_token(jwt_token);
//     request.put(`${__host}:${__port}/users/${user.user_id}/${socket.id}`);

// })