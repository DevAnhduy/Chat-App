import React from 'react';
import { Link } from 'react-router-dom';

const User_Profile = props => {
    return(
        <div className="right-slidebar" id="user-profile">
            <div className="right-sidebar-header with-tab-menu">
                <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item">
                        <Link to="#" className="nav-link active" id="home-tab" data-toogle="tab" role="tab" aria-aria-controls="home" aria-aria-selected="true">
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link" id="profile-tab" data-toogle="tab" role="tab" aria-controls="profile" aria-selected="false">
                            Media
                        </Link> 
                    </li>
                </ul>
                <Link to="#" className="right-sidebar-close">
                    <i className="mdi mdi-window-close"></i>
                </Link>
            </div>
            <div className="right-sidebar-content ps ps--active-y">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="text-center mb-4">
                            <figure className="avatar avatar-xl mb-4">
                                <img src="#" className="rounded-circle" alt="avatar user" />
                            </figure>
                            <h5 className="mb-1">Name</h5>
                            <small className="text-muted font-italic">Last seen: Today</small>
                        </div>
                        <p className="text-muted">123123123</p>
                        <div className="mt-4 mb-4">
                            <h6>Số điện thoại</h6>
                            <p className="text-muted">123456789</p>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6>Thành Phố</h6>
                            <p className="text-muted">HCM</p>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6 className="mb-3">Tài khoản mạng xã hội</h6>
                            <ul className="list-inline social-links">
                                <li className="list-inline-item">
                                    <Link to="#" className="btn btn-floating btn-facebook" data-toggle="tooltip" title="" data-original-title="Facebook">
                                        <i className="mdi mdi-facebook"></i>
                                    </Link>
                                    <Link to="#" className="btn btn-floating btn-twitter" data-toggle="tooltip" title="" data-original-title="Twitter">
                                        <i className="mdi mdi-twitter"></i>
                                    </Link>
                                    <Link to="#" className="btn btn-floating btn-instagram" data-toggle="tooltip" title="" data-original-title="Instagram">
                                        <i className="mdi mdi-instagram"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6 className="mb-3">Cài đặt</h6>
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch11" />
                                    <label className="custom-control-label" for="customSwitch11">Chặn</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch12" />
                                    <label className="custom-control-label" for="customSwitch12">Tắt thông báo</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch13" />
                                    <label className="custom-control-label" for="customSwitch13">Nhận thông báo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-3 px-0 d-flex justify-content-between">
                                    <div>
                                        <figure className="avatar avatar-sm mr-2">
                                            <span className="avatar-title bg-danger rounded-circle">
                                                <i className="mdi mdi-file-pdf-box-outline"></i>
                                            </span>
                                        </figure>
                                        report.pdf
                                    </div>
                                    <div className="dropdown">
                                        <Link to="#" data-toogle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <Link to="#" className="dropdown-item">Chuyển tiếp</Link>
                                            <Link to="#" className="dropdown-item">Tải xuống</Link>
                                            <Link to="#" className="dropdown-item">Xóa</Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User_Profile;