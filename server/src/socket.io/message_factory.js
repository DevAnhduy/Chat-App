const request = require('request');

exports.start_chat = ({io,socket,receiver,users_connected,token,user}) => {
    console.log("Start chat")
    if (receiver.type === 'rooms'){
        socket.join(receiver._id)
    }
         //Join room with room id
    if (!socket._events["/send-message"]) { //Init event send message from client
        socket.on('/send-message', (msg) => {
            this.send_message({ io, receiver, msg, users_connected, token, user })
        })
    }
}

exports.send_message = ({ io, receiver, msg, users_connected, token, user }) => {
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
    // Sort array list chat & add new list chat if need
    user.list_chats.some((chat,index) => {
        if (chat._id + "" === msg.receiver_id){
            const chat_updated = user.list_chats.splice(index,1)[0];
            user.list_chats.unshift(chat_updated);
            return true;
        } 
        if (index === user.list_chats.length - 1) {
            console.log("Last")
            user.list_chats.unshift(receiver)
            return true;
        }
    })
    // Call api to storage message on disk
    request.post({
        url: `${__host}:${__port}/chat/${receiver.type}/${receiver._id}/messages`,
        headers : {
            authorization: token
        }
    }).form({ content: msg.content })
}