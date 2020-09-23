const encode_jwt_token = require('src/utils/encode_jwt_token');
const User_Model = require('src/models/user');
const message_factory = require('src/socket.io/message_factory');
const request = require('request');


module.exports = (server) => {
    let users_connected = {};
    const io = require('socket.io')(server);
    io.on('connection', async (socket) => {
        console.log('A user connected !');
        // Get token user
        const token = socket.handshake.query.authorization;
        // Decode token
        const decode_token = encode_jwt_token(token);
        // Find user information
        const user = await User_Model.findById(decode_token.user_id);
        users_connected[user._id] = socket.id ; // Storage socket id of user to object users connected ;

        socket.on('/start-chat',(receiver) => {
            message_factory.start_chat({ io, socket,receiver,users_connected,token,user })
        })
        socket.on("disconnect",() => {
            request({
                method: 'put',
                url: `${__host}:${__port}/users/${user._id}`,
                headers : { authorization : token },
                json : {list_chats : user.list_chats}
            })
        })
    })
}