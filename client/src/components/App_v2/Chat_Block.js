import React from 'react';
import { Link } from 'react-router-dom';

const Chat_Block = props => {
    return(
        <div className="list-group-item">
            <div>
                <figure className="avatar mr-3">
                    <img src={props.avatar} className="rounded-circle" alt="avatar" />
                </figure>
            </div>
            <div className="users-list-body">
                <div>
                    <h5>{props.name}</h5>
                    <p>
                        <i className="mdi mdi-check-all text-info mr-1"></i>
                        {props.last_message}
                    </p>
                </div>
                <div className="users-list-action">
                    <small className="text-muted">4:30 PM</small>
                    <div className="action-toggle">
                        <div className="dropdown">
                            <a href="#" data-toggle="dropdown">
                                <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">Mở</a>
                                <a className="dropdown-item" href="#">Thông tin cá nhân</a>
                                <a className="dropdown-item text-danger" href="#">Xóa</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat_Block;