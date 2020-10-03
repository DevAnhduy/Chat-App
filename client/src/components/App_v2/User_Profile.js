import React from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import $ from 'jquery';

const User_Profile = props => {
    return(
        <div className="right-sidebar" id="user-profile">
            <div className="right-sidebar-header with-tab-menu">
                <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a href="#user_about" className="nav-link active" id="about-tab" data-toggle="tab" role="tab" aria-controls="home">
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#user_media" className="nav-link" id="profile-tab" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false">
                            Media
                        </a> 
                    </li>
                </ul>
                <a href="#" className="right-sidebar-close" onClick={() => $("#user-profile").removeClass("open")}>
                    <i className="mdi mdi-window-close"></i>
                </a>
            </div>
            <PerfectScrollbar className="right-sidebar-content">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="user_about" role="tabpanel" aria-labelledby="home-tab">
                        <div className="text-center mb-4">
                            <figure className="avatar avatar-xl mb-4">
                                <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar user" />
                            </figure>
                            <h5 className="mb-1">Javascript</h5>
                            <small className="text-muted font-italic">Đã xem gần nhất : Hôm nay</small>
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
                                    <a href="#" className="btn btn-floating btn-facebook" data-toggle="tooltip" title="Facebook" data-original-title="Facebook">
                                        <i className="mdi mdi-facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-floating btn-twitter" data-toggle="tooltip" title="Twitter" data-original-title="Twitter">
                                        <i className="mdi mdi-twitter"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="btn btn-floating btn-instagram" data-toggle="tooltip" title="Instagram" data-original-title="Instagram">
                                        <i className="mdi mdi-instagram"></i>
                                    </a>
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
                    <div className="tab-pane fade" id="user_media" role="tabpanel" aria-labelledby="profile-tab">
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
                                        <a href="#" data-toggle="dropdown">
                                            <i className="mdi mdi-dots-horizontal"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#" className="dropdown-item">Chuyển tiếp</a>
                                            <a href="#" className="dropdown-item">Tải xuống</a>
                                            <a href="#" className="dropdown-item">Xóa</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default User_Profile;