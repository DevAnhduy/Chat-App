import React from 'react';
import { Link } from 'react-router-dom';

const Setting = props => {
    return(
        <div className="right-sidebar" id="settings">
            <div className="right-sidebar-header">
                <span className="right-sidebar-title">Cài đặt</span>
                <Link to="#" className="right-sidebar-close">
                    <i className="mdi mdi-window-close"></i>
                </Link>
            </div>
            <div className="right-sidebar-content ps">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item py-3 px-0">
                        <div className="form-item custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" checked="" id="customSwitch14" />
                            <label className="custom-control-label" for="customSwitch14">Cho phép người đang truy cập trò chuyện</label>
                        </div>
                    </li>
                    <li className="list-group-item py-3 px-0">
                        <div className="form-item custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" checked="" id="customSwitch14" />
                            <label className="custom-control-label" for="customSwitch14">Cho phép người đang truy cập trò chuyện</label>
                        </div>
                    </li>
                    <li className="list-group-item py-3 px-0">
                        <div className="form-item custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" checked="" id="customSwitch14" />
                            <label className="custom-control-label" for="customSwitch14">Cho phép người đang truy cập trò chuyện</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Setting;