import React from 'react';
import { Link } from 'react-router-dom';

const Notification = props => {
    return(
        <div className="right-sidebar" id="notifications">
            <div className="right-sidebar-header">
                <span className="right-sidebar-title">Thông báo</span>
                <Link to="#" data-right-sidebar="settings" title="Settings">
                    <i className="mdi mdi-cog"></i>
                </Link>
                <Link to="#" className="right-sidebar-close">
                    <i className="mdi mdi-close"></i>
                </Link>
            </div>
            <div className="right-sidebar-content ps">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                        <div className="d-flex">
                            <figure className="avatar avatar-state-warning mr-3">
                                <span className="avatar-title bg-info-bright text-info rounded-circle" >
                                    <i className="mdi mdi-server"></i>
                                </span>
                            </figure>
                            <div>
                                <div>Bạn đã vào 1 nhóm chat</div>
                                <span className="text-muted small">
                                    <i className="mdi mdi-clock-outline small mr-1"></i> Hôm nay
                                </span>
                            </div>
                        </div>
                        <div className="dropdown">
                            <Link to="#" data-toogle="dropdown">
                                <i className="mdi mdi-dots-horizontal"></i>
                            </Link>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link to="#" className="dropdown-item">Chưa đọc</Link>
                            <Link to="#" className="dropdown-item">Chi tiết</Link>
                            <Link to="#" className="dropdown-item">Xóa</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
} 

export default Notification