import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const logo = require('../../assets/logo.png');
const bell_icon = require('../../assets/svgs/bell.svg');

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
                    <li onClick={() => { $(".left-sidebar").removeClass("open"); $("#chats").addClass("open") }}>
                        <a className="active" data-left-sidebar="chats" data-toggle="tooltip" title="Chats" data-placement="right"  data-original-title="Chats">
                            <span className="badge badge-warning"></span> 
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                            </svg>
                        </a> 
                    </li>
                    <li onClick={() => { $(".left-sidebar").removeClass("open"); $("#friends").addClass("open")}}>
                        <a data-left-sidebar="friends" data-toggle="tooltip" title="Bạn bè" data-placement="right" data-original-title="Friends">
                            <span className="badge badge-danger"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx={12} cy={7} r={4} />
                            </svg>
                        </a>
                    </li>
                    <li onClick={() => { $(".left-sidebar").removeClass("open"); $("#favorites").addClass("open") }}>
                        <a data-left-sidebar="favorites" data-toggle="tooltip" title="Yêu thích" data-placement="right" >
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </a>
                    </li>
                    <li onClick={() => $("#notifications").addClass("open")}  >
                        <a data-toggle="tooltip" title="Thông báo" data-placement="right">
                            <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" stroke="currentColor" clipRule="evenodd"><path d="M1 20v-2.946c1.993-.656 2.575-2.158 3.668-6.077.897-3.218 1.891-6.784 4.873-8.023-.027-.147-.041-.299-.041-.454 0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 .156-.014.309-.042.458 2.987 1.244 3.984 4.813 4.884 8.033 1.103 3.95 1.697 5.423 3.658 6.062v2.947h-7c0 2.208-1.792 4-4 4s-4-1.792-4-4h-7zm14 0h-6c0 1.656 1.344 3 3 3s3-1.344 3-3zm-13-1h20v-1.241c-2.062-.918-2.82-3.633-3.621-6.498-1.066-3.814-2.167-7.758-6.379-7.761-4.21 0-5.308 3.937-6.369 7.745-.8 2.872-1.559 5.593-3.631 6.514v1.241zm11.492-16.345l.008-.155c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5l.008.152c.455-.099.949-.152 1.487-.152.542 0 1.039.054 1.497.155z" /></svg>

                        </a>
                    </li>
                    <li className="brackets" onClick={() => { $(".left-sidebar").removeClass("open"); $("#archived").addClass("open") }}>
                        <a href="#" data-left-sidebar="archived" title="Lưu trữ">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8" /><rect x={1} y={3} width={22} height={5} />
                                <line x1={10} y1={12} x2={14} y2={12} />
                            </svg>
                        </a>
                    </li>
                    <li className="d-none d-lg-block" data-toggle="tooltip" title="Cài đặt" onClick={() => $("#settings").addClass("open")}>
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