import React from 'react';
import { Link } from 'react-router-dom';

const Chat_Block = props => {
    return(
        <li className="list-group-item">
            <div>
                <figure className="avatar mr-3">
                    <img src={props.avatar} className="rounded-circle" alt="avatar" />
                </figure>
            </div>
            <div className="users-list-body">
                <div>
                    <h5>{props.name}</h5>
                    <p>
                        <i className="mdi mdi-check-all text-info mr-1">
                            Last message
                        </i>
                    </p>
                </div>
                <div className="users-list-action">
                    <small className="text-muted">4:30 PM</small>
                    <div className="action-toggle">
                        <div className="dropdown">
                            <Link to="#" >
                                <i className="mdi mdi-dots-horizontal"></i>
                            </Link>
                            <div className="dropdrown-menu dropdown-menu-right">
                                <Link className="dropdown-item" to="#">Mở</Link>
                                <Link className="dropdown-item" to="#">Thông tin cá nhân</Link>
                                <Link className="dropdown-item text-danger" to="#">Xóa</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Chat_Block;