const request = require('request');

exports.start_chat = ({io,socket,receiver,users_connected,token}) => {
    socket.removeAllListeners('/send-message')
    
    if (receiver.type === 'rooms')
        socket.join(receiver._id) //Join room with room id
    
    socket.on('/send-message',(msg) => {
        this.send_message({ io, receiver, msg, users_connected, token })
    })
}

exports.send_message = ({ io, receiver, msg, users_connected, token }) => {
    const message_to_receiver = {
        sender_id : msg.sender_id,
        receiver_id : msg.receiver_id,
        content: msg.content
    }

    if (receiver.type === 'rooms') // If receiver is room
        io.to(receiver._id).emit('/receiver-message', message_to_receiver);
    else { // If receiver is user
        io.to(users_connected[receiver._id]).emit('/receiver-message',message_to_receiver)
        io.to(users_connected[msg.sender_id]).emit('/receiver-message',message_to_receiver);
    }
    // Call api to storage message on disk
    request.post({
        url: `${__host}:${__port}/chat/${receiver.type}/${receiver._id}/messages`,
        headers : {
            authorization: token
        }
    }).form({ content: msg.content })
}