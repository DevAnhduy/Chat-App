import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import PerfectScrollbar from 'react-perfect-scrollbar';
import call_api from '../../utils/call_api';
import { useSelector } from 'react-redux';

const notification_type = {
    friend_request : {
        icon_class : "mdi mdi-account-plus"
    },
    join_room : {
        icon_class : "mdi mdi-account-plus"
    }
}

const Notification_Block = props => {
    return (
        <li className="list-group-item py-3 px-0 d-flex justify-content-between">
            <div className="d-flex">
                <figure className="avatar avatar-state-warning mr-3">
                    <span className="avatar-title bg-info-bright text-info rounded-circle" >
                        <i className={notification_type[props.notification_type].icon_class}></i>
                    </span>
                </figure>
                <div>
                    <div>{props.content}</div>
                    <span className="text-muted small">
                        <i className="mdi mdi-clock-outline small mr-1"></i>{props.time}
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
    )
}

const Friend_Request_Block = props => {
    return (
        <li className="list-group-item py-3 px-0 d-flex justify-content-between">
            <div className="d-flex">
                <figure className="avatar mr-3">
                    <img src={props.avatar} className="rounded-circle" alt="request user avatar" style={{height:"2.7rem",width:"2.7rem"}} />
                </figure>
                <div>
                    <div>Bạn nhận được lời mời kết bạn từ {props.name} </div>
                    <span className="text-muted small">
                        <i className="mdi mdi-clock-outline small mr-1"></i>{props.time}
                    </span>
                    <div className="mt-1">
                        <button className="btn btn-secondary">Từ chối</button>
                        <button className="ml-2 btn btn-danger">Xác nhận</button>
                    </div>
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
    )
}

const Notification_Main = props => {
    const user = useSelector((state) => state.user);
    const [list_noti,set_list_noti] = useState([]);
    useEffect(() => {
        call_api({
            url : `${process.env.REACT_APP_API_URL}/users/request-friend/${user._id}`
        })
            .then(response => {
                let list_noti = [];
                response.data.data.friends_request.map(friend_request => {
                    list_noti.push(<Friend_Request_Block avatar={friend_request.avatar} name={friend_request.name} time="Hôm nay" />)
                })
                set_list_noti([...list_noti]);
            })
    },[])
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
                    <Notification_Block content="Bạn nhận được lời mời kết bạn" notification_type="friend_request" time="Hôm nay"  />
                    {list_noti}
                </ul>
            </PerfectScrollbar>
        </div>
    )
} 

export default Notification_Main;