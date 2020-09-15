const request = require('request');
const User_Model = require('src/models/user');
const encode_jwt_token = require('src/utils/encode_jwt_token');
const moment= require('moment');
module.exports = (server) => {
    let user_connected = {};
    const io = require('socket.io')(server);
    io.on('connection', async (socket) => {
        console.log('A user connected!');
        const jwt_token = socket.handshake.query.authorization;
        const decode_token = encode_jwt_token(jwt_token);
        // const get_user_info = new Promise((resolve,reject) => {
        //     User_Model.findById(decode_token.user_id)
        //         .then(response => resolve(response))
        //         .catch(error => reject(error))
        //     // request.get({
        //     //     url: `${__host}:${__port}/users/${decode_token.user_id}`,
        //     //     headers: {
        //     //         authorization: jwt_token
        //     //     }
        //     // },(err,response) => {
        //     //     if(err) reject(err)
        //     //     else resolve(JSON.parse(response.body).data)
        //     // })
        // })
        const user = await User_Model.findById(decode_token.user_id) ;
        user_connected[user._id] = socket.id;
        socket.on('/join-room', (data) => {
            socket.removeAllListeners('/send-message');
            if(data.type === 'rooms')
                socket.join(data.room_id);

            socket.on('/send-message', (msg) => {
                const message_to_client = {
                    sender_id: user._id,
                    receiver_id: data.room_id,
                    content: msg.content
                }
                if (data.type === 'rooms')
                    io.to(data.room_id).emit('/send-message', message_to_client);
                else {
                    io.to(user_connected[data.room_id]).emit('/send-message',message_to_client);
                    io.to(user_connected[user._id]).emit('/send-message', message_to_client);
                }
                request.post({
                    url: `${__host}:${__port}/chat/${data.type}/${data.room_id}/messages`,
                    headers: {
                        authorization: jwt_token
                    }
                }).form({content: msg.content});
            })
        })
    })
}