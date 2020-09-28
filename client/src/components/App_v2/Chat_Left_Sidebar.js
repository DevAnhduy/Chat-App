import React from 'react';
import Chat_Block from './Chat_Block.js';

const Chat_Left_Sidebar = props => {
    return (
        <div id="chats" className="left-sidebar open">
            <div className="left-sidebar-header">
                <form>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Tìm kiếm bạn bè, phòng chat,..."></input>
                    </div>
                </form>
            </div>
            <div className="left-sidebar-content ps ps--active-y">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item active">
                        <div>
                            <figure className="avatar mr-3">

                            </figure>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}