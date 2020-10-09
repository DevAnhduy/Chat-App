import React from 'react';
import { Message } from '../components/App_v2/Chat';
import { add_message } from '../actions/message_actions';
import { useDispatch } from 'react-redux';
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
        message : ({socket,user,obj_receivers},callback) => {
            socket.on('/receiver-message', (msg) => {
                console.log(obj_receivers)
                console.log("Receiver message")
                //const dispatch = useDispatch();
                const isChatPage = window.location.href.includes("http://localhost:3000/chat");
                // if (isChatPage) {
                ////*Update after ...
                // }      
                    const page_url = window.location.pathname;
                    const receiver_selected = page_url.substring(page_url.lastIndexOf("/") + 1);
                    //Get main message element
                    const main_message = document.getElementById('main-message');
                    //Create div wrap message
                    let wrap_message = document.createElement('div');
                    //Check if sender is user
                    if (user._id === msg.sender_id) {
                        // wrap_message.className = 'messages sender';
                        // //Create element for message
                        // let span_message = document.createElement('span');
                        // span_message.innerHTML = `${msg.content}`;
                        // //Append span message in wrap message
                        // wrap_message.appendChild(span_message);
                        // //Append wrap message in main message
                        // main_message.appendChild(wrap_message);
                        const new_message = (<div className={`message-item out`}>
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        //<img src={obj_receivers[msg.sender_id].avatar} className="rounded-circle" alt="avatar" />
                                    </figure>
                                    <div>
                                        <h5>{obj_receivers[msg.sender_id].avatar.name}</h5>
                                        <div className="time">10:12</div>
                                    </div>
                                </div>
                                <Message content={msg.content}
                                         sender_id={msg.sender_id} />
                            </div>)
                        callback(new_message)
                        //dispatch(add_message(new_message))
                        //main_message.scrollTop = main_message.scrollHeight;
                    }
                    else if (msg.sender_id === receiver_selected && msg.receiver_id === user._id || receiver_selected === msg.receiver_id ) { //Check receiver_selected is sender and receiver is user
                        // wrap_message.className = 'messages';
                        // //Create div  element for avatar
                        // let avatar_message = document.createElement('div');
                        // avatar_message.className = "avatar-message";
                        // avatar_message.style.backgroundImage = `url("${obj_receivers[msg.sender_id].avatar}")`;
                        // //Append avatar message in wrap message
                        // wrap_message.appendChild(avatar_message);
                        // //Create element for message
                        // let span_message = document.createElement('span');
                        // span_message.innerHTML = `${msg.content}`;
                        // //Append span message in wrap message
                        // wrap_message.appendChild(span_message);
                        // //Append wrap message in main message
                        // main_message.appendChild(wrap_message);
                        // main_message.scrollTop = main_message.scrollHeight;
                        const new_message = (<div className={`message-item out`}>
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        //<img src={obj_receivers[msg.sender_id].avatar} className="rounded-circle" alt="avatar" />
                                    </figure>
                                    <div>
                                        <h5>{obj_receivers[msg.sender_id].avatar.name}</h5>
                                        <div className="time">10:12</div>
                                    </div>
                                </div>
                                <Message content={msg.content}
                                         sender_id={msg.sender_id} />
                            </div>)
                        callback(new_message)
                    }
                    else { 
                        console.log("Receiver is not selected")
                    }
            })
        }
    }
}

export default socket_handle_factory;