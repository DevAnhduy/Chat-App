import React from 'react';
import $ from 'jquery';

const Setting_Right = props => {
    return(
        <div className="right-sidebar" id="settings">
            <div className="right-sidebar-header">
                <span className="right-sidebar-title">Cài đặt</span>
                <a className="right-sidebar-close" onClick={() => $("#settings").removeClass("open")} >
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

const Settings_Modal = props => {
    return (
        <div className="modal fade" id="setting_modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="mdi mdi-cog mr-2"> Cài đặt</i>
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
                            <div className="tab-pane" id="notification" role="tabpanel">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch_allow_mobile_notification" />
                                    <label className="custom-control-label" for="switch_allow_mobile_notification" >Cho phép thông báo tới điện thoại</label>
                                </div>
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch_allow_notification_from_friend" />
                                    <label className="custom-control-label" for="switch_allow_notification_from_friend" >Cho phép thông báo từ bạn bè</label>
                                </div>
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch_allow_notification_to_email" />
                                    <label className="custom-control-label" for="switch_allow_notification_to_email" >Gửi thông báo đến email</label>
                                </div>
                            </div>
                            <div className="tab-pane" id="security">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="switch_allow_notification_about_suspicious_entries" />
                                    <label className="custom-control-label" for="switch_allow_notification_about_suspicious_entries" >Cho phép thông báo bất thường về tài khoản</label>
                                </div>
                                <div className="form-item">
                                    <p>
                                        <a className="btn btn-light" data-toggle="collapse" href="#collapse_question_security" role="button">
                                            <i className="mdi mdi-plus mr-2">Câu hỏi bí mật</i>
                                        </a>
                                    </p>
                                    <div className="collapse" id="collapse_question_security">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Câu hỏi 1" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Trả lời câu hỏi 1" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Câu hỏi 2" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Trả lời câu hỏi 2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Setting_Right,Settings_Modal };