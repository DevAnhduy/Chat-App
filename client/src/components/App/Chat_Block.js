import React from 'react';
import './Chat_Block.scss';

export class CHAT_BLOCK extends React.Component{
    render(){
        return(
            <div className="row chat-block">
                <div className="wrapper-block-avatar" >
                    <div className="chat-block-avatar" 
                        style={{ backgroundImage: this.props.avatar ? `url(${this.props.avatar})` : '' }} 
                    >
                    </div>
                </div>
                <div className="wrapper-block-name">
                    <div className="chat-block-name">
                        {this.props.name}
                    </div>
                </div>
            </div>
        )
    }
}