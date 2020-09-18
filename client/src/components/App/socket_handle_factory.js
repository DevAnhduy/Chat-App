const socket_handle_factory = {
    send_to_server : {
        message : ({socket = {},user = {},receiver_id = '',message = ''}) => {
            socket.emit('/send-message', {
                content: message,
                sender_id: user._id,
                receiver_id
               });
        },
        start_chat : (socket,receiver) => {
            socket.emit('/start-chat',{
                _id : receiver._id,
                type: receiver.type
              })
        }
    },
    receiver_from_server : {
        message : (socket,user,obj_receivers) => {
            socket.on('/receiver-message', (msg) => {
                //Get main message element
                const main_message = document.getElementById('main-message');
                //Create div wrap message
                let wrap_message = document.createElement('div');
                //Check if sender is user
                if (msg.sender_id === user._id)
                  wrap_message.className = 'messages sender';
                else { 
                  wrap_message.className = 'messages';
                  //Create div  element for avatar
                  let avatar_message = document.createElement('div');
                  avatar_message.className = "avatar-message";
                  avatar_message.style.backgroundImage = `url("${obj_receivers[msg.sender_id].avatar}")`;
                  //Append avatar message in wrap message
                  wrap_message.appendChild(avatar_message);
                }
                //Create element for message
                let span_message = document.createElement('span');
                span_message.innerHTML = `${msg.content}`;
                //Append span message in wrap message
                wrap_message.appendChild(span_message);
                //Append wrap message in main message
                main_message.appendChild(wrap_message);
                main_message.scrollTop = main_message.scrollHeight;
            })
        }
    }
}

export default socket_handle_factory;