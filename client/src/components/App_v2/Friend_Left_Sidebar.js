import React from 'react';
import Friend_Block from './Friend_Block';

const Friend_Left_Sidebar = props => {
    return(
        <div id="friends" className="left-sidebar">
            <div className="left-sidebar-header">
                <form>
                    <h4 className="mb-4">Bạn bè</h4>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Tìm kiếm bạnbè"></input>
                    </div>
                </form>
            </div>
            <div className="left-sidebar-content ps">
                <ul className="list-group list-group-flush"> 
                    <Friend_Block />
                </ul>
            </div>
        </div>
    )
}

export default Friend_Left_Sidebar;