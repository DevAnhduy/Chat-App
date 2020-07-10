const io = require('socket.io')(server);
const encode_cookie = require('./src/utils/encode_cookie');
const request = require('request');
const User_Model = require('./src/models/user');
const { ObjectID } = require('mongodb');

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