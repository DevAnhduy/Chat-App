import React from 'react';
import Friend_Block from './Friend_Block';

const Archived_Left_Sidebar = props => {
    return(
        <div className="archived" className="left-sidebar">
            <div className="left-sidebar-header">
                <form>
                    <h4 className="mb-4">Archived</h4>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Search archived" />
                    </div>
                </form>
            </div>
            <div className="left-sidebar-content ps">
                <ul className="list-group list-group-flush users-list">
                    <Friend_Block />
                </ul>
            </div>
        </div>
    )
}

export default Archived_Left_Sidebar