import React from 'react';
import Favorite_Left_Block from './Favorite_Left_Block';

const Favorite_Left_Sidebar = props => {
    return(
        <div className="favorites" className="left-sidebar">
            <div className="left-sidebar-header">
                <form>
                    <h4 className="mb-4">Yêu thích</h4>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Tìm kiếm yêu thích .." />
                    </div>
                </form>
            </div>
            <div className="left-sidebar-content ps">
                <ul className="list-group list-group-flush users-list">
                    <Favorite_Left_Block />
                </ul>
            </div>
        </div>
    )
}

export default Favorite_Left_Sidebar;