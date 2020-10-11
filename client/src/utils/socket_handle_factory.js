import React from 'react';
import { Message } from '../components/App_v2/Chat';
import { add_message } from '../actions/message_actions';
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
            socket.on('/receiver-message', (msg) => {
                callback(msg)
                // console.log("Receiver message")
                // //const dispatch = useDispatch();
                // const isChatPage = window.location.href.includes("http://localhost:3000/chat");
                // // if (isChatPage) {
                // ////*Update after ...
                // // }
                //     const page_url = window.location.pathname;
                //     const receiver_selected = page_url.substring(page_url.lastIndexOf("/") + 1);
                //     //Get main message element
                //     const main_message = document.getElementById('main-message');
                //     //Create div wrap message
                //     let wrap_message = document.createElement('div');
                //     //Check if sender is user
                //     if (user._id === msg.sender_id) {
                //         const new_message = (<div className={`message-item out`}>
                //                 <div className="message-avatar">
                //                     <figure className="avatar avatar-sm">
                //                         <img src={list_receivers[msg.sender_id].avatar} className="rounded-circle" alt="avatar" />
                //                     </figure>
                //                     <div>
                //                         <h5>{list_receivers[msg.sender_id].avatar.name}</h5>
                //                         <div className="time">10:12</div>
                //                     </div>
                //                 </div>
                //                 <Message content={msg.content}
                //                          sender_id={msg.sender_id} />
                //             </div>)
                //         callback(msg)
                //     }
                //     else if (msg.sender_id === receiver_selected && msg.receiver_id === user._id || receiver_selected === msg.receiver_id ) { //Check receiver_selected is sender and receiver is user
                //         const new_message = (<div className={`message-item in`}>
                //                 <div className="message-avatar">
                //                     <figure className="avatar avatar-sm">
                //                         <img src={list_receivers[msg.sender_id].avatar} className="rounded-circle" alt="avatar" />
                //                     </figure>
                //                     <div>
                //                         <h5>{list_receivers[msg.sender_id].avatar.name}</h5>
                //                         <div className="time">10:12</div>
                //                     </div>
                //                 </div>
                //                 <Message content={msg.content}
                //                          sender_id={msg.sender_id} />
                //             </div>)
                //         callback(new_message)
                //     }
                //     else {
                //         console.log("Receiver is not selected")
                //     }
            })
        }
    }
}

export default socket_handle_factory;