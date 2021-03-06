import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { ReactComponent as Bell_Icon } from '../../assets/svgs/bell.svg';
import { ReactComponent as Archived_Icon } from '../../assets/svgs/archived.svg';
import { ReactComponent as Setting_Icon } from '../../assets/svgs/setting.svg';
import { ReactComponent as Chat_Icon } from '../../assets/svgs/chat.svg';
import { ReactComponent as Friend_Icon } from '../../assets/svgs/friend.svg';
import { ReactComponent as Star_Icon } from '../../assets/svgs/star.svg';
const logo = require('../../assets/logo.png');

const Navigation = props => {
    const user = useSelector((state) => state.user)
    const navigations_top = [
        {
            title : "Chats",
            icon : <Chat_Icon />,
            href : "chats",
            class_list : "nav_item"
        },
        {
            title : "Bạn bè",
            icon : <Friend_Icon />,
            href : "friends",
            class_list : "nav_item"
        },
        {
            title : "Yêu thích",
            icon : <Star_Icon />,
            href : "favorites",
            class_list : "nav_item"
        },
        {
            title : "Lưu trữ",
            icon : <Archived_Icon />,
            href : "archived",
            class_list : "nav_item brackets"
        }
    ]
    const render_navigations = () => {
        const navigation_selected = (selected,index) => {
            props.set_sidebar_content(selected)
        }
        return navigations_top.map((navigation,index) => {
            return (
                <li className={navigation.class_list} onClick={() => navigation_selected(navigation.href,index)} >
                    <a className={navigation.href === "chats" ? "active" : "" } data-toggle="tooltip" title={navigation.title} data-placement="right">
                        {navigation.icon}
                    </a> 
                </li>
            )
        })
    }  
    return(
        <nav className="navigation" id="navigation">
            <div className="nav-group">
                <ul>
                    <li className="logo">
                        <Link to="/" ><img src={logo} alt="FSNET logo" /></Link>
                    </li>
                    <li className="navigation-action-button dropright" title="Thêm" data-placement="right">
                        <a data-toggle="dropdown">
                            <i className="mdi mdi-plus"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" data-left-sidebar="friends">Bắt đầu chat</a>
                            <a className="dropdown-item" data-toggle="modal" data-target="#new_room">Tạo nhóm chat</a>
                            <a className="dropdown-item" data-toggle="modal" data-target="#add_friend">Thêm bạn bè</a>
                        </div>
                    </li>
                    {render_navigations()}
                    <li className="nav_item" onClick={() => $("#notifications").addClass("open") } >
                        <a data-toggle="tooltip" data-placement="right" title="Thông báo" data-placement="right" >
                            <Bell_Icon />
                        </a>
                    </li>
                    <li className="d-log-block">
                        <a data-toggle="tooltip" data-placement="right" title="Cài đặt" data-placement="right">
                            <Setting_Icon />
                        </a>
                    </li>
                    <li data-toggle="tooltip" title="" data-placement="right" data-original-title="User menu">
                        <a data-toggle="dropdown">
                            <figure className="avatar avatar-sm">
                                <img src={user.avatar} className="rounded-circle" alt="avatar user" />
                            </figure>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" data-toggle="modal" data-target="#edit_profile">
                                Chỉnh sửa thông tin 
                            </a>
                            <a className="dropdown-item" data-right-sidebar="user-profile">
                                Thông tin cá nhân
                            </a>
                            <a className="dropdown-item" data-toggle="modal" data-target="#setting_modal">
                                Cài đặt
                            </a>
                            <a lassName="dropdown-item d-none d-md-block example-app-tour-start">
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