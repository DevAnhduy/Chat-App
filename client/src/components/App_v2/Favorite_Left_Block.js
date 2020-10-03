import React from 'react';

const Favorite_Left_Block = props => {
    return(
        <li className="list-group-item">
            <div className="users-list-body">
                <div>
                    <h5>{props.name}</h5>
                    <p>Test</p>
                </div>
                <div className="users-list-action">
                    <div className="action-toggle">
                        <div className="dropdown">
                            <a data-toggle="dropdown"><i className="mdi mdi-dots-horizontal"></i></a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item">Trò chuyện</a>
                                <a className="dropdown-item">Xóa yêu thích</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Favorite_Left_Block;