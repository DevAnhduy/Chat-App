import React from 'react';
import { Link } from 'react-router-dom';
const logo = require('../../assets/logo.png');

const Navigation = props => {
    return(
        <nav className="navigation">
            <div className="nav-group">
                <ul>
                    <li className="logo">
                        <Link to="/" ><img src={logo} alt="FSNET logo" /></Link>
                    </li>
                    <li className="navigation-action-button dropright" title="Thêm" data-placement="right">
                        <a href="#" data-toggle="dropdown">
                            <i className="mdi mdi-plus"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a href="#" className="dropdown-item" data-left-sidebar="friends">Bắt đầu chat</a>
                            <a href="#" className="dropdown-item" data-toggle="modal" data-target="#newGroup">Tạo nhóm chat</a>
                            <a href="#" className="dropdown-item" data-toggle="modal" data-target="#intiveUsers">Mời bạn bè</a>
                        </div>
                    </li>
                    <li>
                        <a className="active" data-left-sidebar="chats" href="#" data-toggle="tooltip" title="Chats" data-placement="right" data-original-title="Chats">
                            <span className="badge badge-warning"></span> 
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                            </svg>
                        </a> 
                    </li>
                    <li>
                        <a href="#" data-left-sidebar="friends" data-toggle="tooltip" title="Bạn bè" data-placement="right" data-original-title="Friends">
                            <span className="badge badge-danger"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx={12} cy={7} r={4} />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" data-left-sidebar="favorites" data-toggle="tooltip" title="Yêu thích" data-placement="right" data-original-title="Favorites">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </a>
                    </li>
                    <li className="brackets">
                        <a href="#" data-left-sidebar="archived" title="Lưu trữ" data-placement="right" data-original-title="Archived">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8" /><rect x={1} y={3} width={22} height={5} />
                                <line x1={10} y1={12} x2={14} y2={12} />
                            </svg>
                        </a>
                    </li>
                    <li className="d-none d-lg-block" data-toggle="tooltip" title="Cài đặt" data-placement="right" data-original-title="Settings">
                        <a href="#" data-toggle="modal" data-right-sidebar="settings">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
                                <circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </a>
                    </li>
                    <li data-toggle="tooltip" title="" data-placement="right" data-original-title="User menu">
                        <a href="#" data-toggle="dropdown">
                            <figure className="avatar avatar-sm">
                                <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar user" />
                            </figure>
                        </a>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item" data-toggle="modal" data-target="#editProfile">
                                Chỉnh sửa thông tin 
                            </a>
                            <a href="#" className="dropdown-item" data-right-sidebar="user-profile">
                                Thông tin cá nhân
                            </a>
                            <a href="#" className="dropdown-item" data-toggle="modal" data-target="#settingsModal">
                                Cài đặt
                            </a>
                            <a href="#" className="dropdown-item d-none d-md-block example-app-tour-start">
                                Hướng dẫn sử dụng
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="/login" className="dropdown-item text-danger">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;