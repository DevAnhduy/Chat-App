import React from 'react'
const chat_room_style = require('./chat_room.module.css');

export class CHAT_ROOM extends React.Component{
    render(){
        return(
            <div className={`row ${chat_room_style['chat-room']}`}>
                <div className={`col-3 ${chat_room_style['chat-room-avatar']}`} 
                     style={{ backgroundImage: `url('/images/chat_room_default_icon.jpg')` }}>
                </div>
                <div className={`col-9 ${chat_room_style['chat-room-name']}`}>
                    {this.props.room_name}
                </div>
            </div>
        )
    }
}