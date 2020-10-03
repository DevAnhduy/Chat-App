import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Setting = props => {
    return(
        <div className="right-sidebar" id="settings">
            <div className="right-sidebar-header">
                <span className="right-sidebar-title">Cài đặt</span>
                <a href="#" className="right-sidebar-close" onClick={() => $("#settings").removeClass("open")} >
                    <i className="mdi mdi-window-close"></i>
                </a>
            </div>
            <div className="right-sidebar-content ps">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item py-3 px-0">
                        <div className="form-item custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="customSwitch14" />
                            <label className="custom-control-label" for="customSwitch14">Cho phép trò chuyện</label>
                        </div>
                    </li>
                    <li className="list-group-item py-3 px-0">
                        <div className="form-item custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="customSwitch15" />
                            <label className="custom-control-label" for="customSwitch15">Thông tin cá nhân riêng tư</label>
                        </div>
                    </li>
                    <li className="list-group-item py-3 px-0">
                        <div className="form-item custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="customSwitch16" />
                            <label className="custom-control-label" for="customSwitch16">Chấp nhận tin nhắn chờ</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Setting;