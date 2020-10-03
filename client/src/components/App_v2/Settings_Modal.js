import React from 'react';

const Settings_Modal = props => {
    return (
        <div className="modal fade" id="setting_modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="mdi mdi-cog mr-2">Cài đặt</i>
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Đóng">
                            <i className="mdi mdi-close"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#account" role="tab" aria-controls="account">
                                    Tài khoản
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#notification" role="tab" aria-controls="notification">
                                    Thông báo
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#security" role="tab" aria-controls="securiy">
                                    Bảo mật
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="account" role="tabpanel">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch_allow_connected_contact" />
                                    <label className="custom-control-label" for="switch_allow_connected_contact">Cho phép trò chuyện</label>
                                </div>
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch_profile_privacy" />
                                    <label className="custom-control-label" for="switch_profile_privacy">Hồ sơ riêng tư</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer"></div>
                </div>
            </div>
        </div>
    )
}

export default Settings_Modal;