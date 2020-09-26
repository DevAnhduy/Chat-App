import React from 'react';
import { Link } from 'react-router-dom';
import fsnet_logo from '../../assets/fsnet-logo.png';
import './Navbar.scss';

const Navbar =  props => {
    return (
        <navbar className="navbar fixed-top bg-white navbar-expand-lg navbar-light" >
            <div className="container-fluid">
                <Link className="navbar-brand">
                    <img src={fsnet_logo} alt="fsnet-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbar_nav" aria-expanded="false" aria-label="Toggle navigation" >
                            <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar_nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link">Trang chủ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Chat</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Tính năng</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Tài khoản</Link>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link">Đăng nhập</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Đăng ký</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Quên mật khẩu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Khóa màn hình</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Mở màn hình</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Trang khác</Link>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link">Giá cả</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Hỗ trợ</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <Link className="btn btn-primary ml-auto">Buy now</Link>
                </div>
            </div>
        </navbar>
    )
}

export default Navbar;