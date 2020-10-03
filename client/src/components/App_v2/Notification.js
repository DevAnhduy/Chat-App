import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Notification = props => {
    return(
        <div className="right-sidebar" id="notifications">
            <div className="right-sidebar-header">
                <span className="right-sidebar-title">Thông báo</span>
                <a href="#" data-right-sidebar="settings" title="Settings">
                    <i className="mdi mdi-cog"></i>
                </a>
                <a className="right-sidebar-close" onClick={() => $("#notifications").removeClass("open")}>
                    <i className="mdi mdi-close"></i>
                </a>
            </div>
            <PerfectScrollbar className="right-sidebar-content">
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
                            <a data-toggle="dropdown">
                                <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a href="#" className="dropdown-item">Chưa đọc</a>
                                <a href="#" className="dropdown-item">Chi tiết</a>
                                <a href="#" className="dropdown-item">Xóa</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </PerfectScrollbar>
        </div>
    )
} 

export default Notification