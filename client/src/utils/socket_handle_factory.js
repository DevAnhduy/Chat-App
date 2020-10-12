import React from 'react';
import { Message } from '../components/App_v2/Chat';
const socket_handle_factory = {
    send_to_server : {
        message : ({socket = {},user = {},receiver = {},message = ''}) => {
            socket.emit('/send-message', {
                content: message,
                sender_id: user._id,
                receiver
               });
        },
        start_chat : (socket,receiver) => {
            socket.emit('/start-chat', {
                _id: receiver._id,
                type: receiver.type
            })
        }
    },
    receiver_from_server : {
        message : ({socket,user,list_receivers},callback) => {
            //const messages = useSelector("messages");
            console.log(socket.off("/receiver-message"))
            socket.on('/receiver-message', (msg) => {
                //console.log(list_receivers)
                console.log("Receiver message")
                //callback(msg)
                // const isChatPage = window.location.href.includes("http://localhost:3000/chat");
                // // if (isChatPage) {
                // ////*Update after ...
                // // }
                    const page_url = window.location.pathname;
                    const receiver_selected = page_url.substring(page_url.lastIndexOf("/") + 1);
                    //Get main message element
                    const main_message = document.getElementById('main-message');
                    const list_message = document.getElementsByClassName("message-item");
                    const last_message = list_message[list_message.length - 1];
                    //Check if sender is user
                    if (user._id === msg.sender_id) {
                        const new_message = (
                            <Message content={msg.content}
                                     sender_id={msg.sender_id} 
                                     sender={msg.sender_id === user._id ? true : false} 
                                     avatar={last_message.getAttribute("sender") !== msg.sender_id ? list_receivers[msg.sender_id].avatar : "" }
                                     name={last_message.getAttribute("sender") !== msg.sender_id ? list_receivers[msg.sender_id].name : "" }
                                     />
                        )
                        callback(new_message)
                    }
                    else if (msg.sender_id === receiver_selected && msg.receiver_id === user._id || receiver_selected === msg.receiver_id ) { //Check receiver_selected is sender and receiver is user
                        const new_message = (
                            <Message content={msg.content}
                                     sender_id={msg.sender_id} 
                                     sender={msg.sender_id === user._id ? true : false} 
                                     avatar={last_message.getAttribute("sender") !== msg.sender_id ? list_receivers[msg.sender_id].avatar : "" }
                                     name={last_message.getAttribute("sender") !== msg.sender_id ? list_receivers[msg.sender_id].name : "" }/>
                        )
                        callback(new_message)
                    }
                    else {
                        console.log("Receiver is not selected")
                    }
                    main_message.scrollTop = main_message.scrollHeight;
            })
        }
    }
}

export default socket_handle_factory;