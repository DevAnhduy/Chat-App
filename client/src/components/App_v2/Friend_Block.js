import React from 'react';

const Friend_Block = props => {
    return(
        <li className="list-group-item">
            <div>
                <figure className="avatar mr-3">
                    <img src={props.avatar} className="rounded-circle" alt="Friend avatar" />
                </figure>
            </div>
            <div className="users-list-body">
                <div>
                    <h5>{props.name}</h5>
                    <p>{props.address}</p>
                </div>
                <div className="users-list-action">
                    <div className="action-toggle">
                        <div className="dropdown">
                            <a data-toogle="dropdown"><i className="mdi mdi-dots-horizontal"></i></a>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item">Trò chuyện</a>
                            <a className="dropdown-item">Thông tin cá nhân</a>
                            <a className="dropdown-item">Chặn</a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Friend_Block;