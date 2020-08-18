const request = require('request');
const User_Model = require('src/models/user');
const { ObjectID } = require('mongodb');
const encode_jwt_token = require('src/utils/encode_jwt_token');
module.exports = (server) => {
    const io = require('socket. io')(server);
    const users_connected = [];
    io.on('connection', (socket) => {
        users_connected.push()
        console.log('A user connected!');
        const jwt_token = socket.handshake.query.authorization;
        const user = encode_jwt_token(jwt_token);
        // socket.id = user.user_id;
        // socket.conn.transport.sid = user.user_id;
        // socket.conn = user.user_id;
        // socket.client.id = user.user_id;
        // socket.client.conn.id = user.user_id;
        //console.log(socket.id);
        // if (socket.id === '5eea1bc4c83863222c9d0e4f'){
        //     socket.join('123123')
        //     console.log(socket)
        // }
        socket.join(user.user_id);
        if (user.user_id != '5eea1bc4c83863222c9d0e4f')
            socket.join('5eea1bc4c83863222c9d0e4f');
        io.to('5eea1bc4c83863222c9d0e4f').emit('test',{data: 'Hello'})
        request.put(`${__host}:${__port}/users/${user.user_id}/${socket.id}`);
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
}