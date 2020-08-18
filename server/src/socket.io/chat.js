// const request = require('request');
// const User_Model = require('src/models/user');
// const { ObjectID } = require('mongodb');
// const encode_jwt_token = require('src/utils/encode_jwt_token');

// module.exports = (socket) => {
//     //#region CHAT WITH ROOM
//     socket.on('/join-room', (data) => {
//         socket.removeAllListeners('/send-message');
//         socket.join(data.room_id);
//         socket.on('/send-message/room', (msg) => {
//             if (user.username) {
//                 io.to(data.room_id).emit('/send-message/room', { sender: user.username, content: msg.content });
//                 request.post(`${__host}:${__port}/chat/rooms/${data.room_id}/messages`,{
//                     headers : {
//                         authorization: socket.handshake.query.authorization
//                     }    
//                 })
//                     .form({content: msg.content })
//             }
//         })
//     })
//     //#endregion
//     //#region  CHAT WITH USER
//     socket.on('/chat/users', (body) => {
//         socket.removeAllListeners('/send-messages/users');
//         socket.on('/send-messages/users', (msg) => {
//             if (user.username) {
//                 User_Model.findById(ObjectID(body.receiver_id))
//                     .select('username socket_id')
//                     .exec()
//                     .then(receiver => {
//                         if (receiver) {
//                             io.to(receiver.socket_id).emit('/send-messages/users', {
//                                 sender: user.username,
//                                 content: msg.content
//                             })
//                             request.post(`${__host}:${__port}/chat/users/${user.user_id}/messages`).form({
//                                 receiver_id: body.receiver_id,
//                                 content: msg.content
//                             })
//                         }
//                     })
//                     .catch(err => {
//                         console.log(err)
//                     })
//             }
//         })
//     })
//     //#endregion
// }