import React from 'react';
import { Link } from 'react-router-dom';

const Chat = props => {
    return (
        <div className="chat">
            <div className="chat-preloader d-none">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading....</span>
                </div>
            </div>
            <div className="no-message-container">
                <div className="row mb-5">
                    <div className="col-md-4 offset-4">
                        <img src='#' className="img-fluid" alt="image" />
                    </div>
                </div>
                <p className="lead">Chọn 1 cuộc trò chuyện để bắt đầu trò chuyện</p>
            </div>
            <div className="chat-header">
                <div className="chat-header-user">
                    <figure className="avatar avatar-state-success">
                        <img src="#" className="rounded-circle" alt="avatar user"/>
                    </figure>
                </div>
                <div className="chat-header-action">
                    <ul className="list-inline" data-intro-js="7">
                        <li className="list-inline-item d-inline d-lg-none">
                            <Link to="#" className="btn btn-danger btn-floating example-chat-close">
                                <i className="mdi mdi-arrow-left"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item" data-toggle="tooltip" title="" data-original-title="Voice call">
                            <Link to="#" className="btn btn-info btn-floating">
                                <i className="mdi mdi-bell-outline"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item" data-toggle="tooltip" title="" data-original-title="Voice call">
                            <Link to="#" className="btn btn-success btn-floating voice-call-request">
                                <i className="mdi mdi-phone"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item" data-toggle="tooltip" title="" data-original-title="Video call">
                            <Link to="#" className="btn btn-warning btn-floating video-call-request">
                                <i className="mdi mdi-vdeo-outline"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link to="#" className="btn btn-dark btn-floating" data-toogle="dropdown">
                                <i className="mdi mdi-dots-horizontal"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link to="#" data-right-sidebar="user-profile" className="dropdown-item">Thông tin cá nhân</Link>
                                <Link to="#" className="dropdown-item example-close-selected-chat">Đóng chat</Link>
                                <Link to="#" className="dropdown-item example-delete-chat">Xóa chat</Link>
                                <Link to="#" className="dropdown-item text-danger example-block-user">Chặn</Link>
                            </div>
                        </li>   
                    </ul>
                </div>
            </div>
            <div className="chat-body ps ps--active-y">
                <div className="messages">
                    <div className="message-item in">
                        <div className="message-avatar">
                            <figure className="avatar avatar-sm">
                                <img src="#" className="rounded-circle" alt="avatar" />
                            </figure>
                            <div>
                                <h5>Name</h5>
                                <div className="time">10:12</div>
                            </div>
                        </div>
                        <div className="message-content">
                            <div className="message-text">Test</div>
                            <div className="dropdown">
                                <Link to="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </Link>
                                <div className="dropdown-menu">
                                    <Link to="#" className="dropdown-item">Trả lời</Link>
                                    <Link to="#" className="dropdown-item">Chuyển tiếp</Link>
                                    <Link to="#" className="dropdown-item">Sao chép</Link>
                                    <Link to="#" className="dropdown-item example-delete-message"></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="message-item out">
                        <div className="message-avatar">
                            <figure className="avatar avatar-sm">
                                <img src="#" className="rounded-circle" alt="avatar" />
                            </figure>
                            <div>
                                <h5>Name</h5>
                                <div className="time">10:12</div>
                            </div>
                        </div>
                        <div className="message-content">
                            <div className="message-text">Test</div>
                            <div className="dropdown">
                                <Link to="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </Link>
                                <div className="dropdown-menu">
                                    <Link to="#" className="dropdown-item">Trả lời</Link>
                                    <Link to="#" className="dropdown-item">Chuyển tiếp</Link>
                                    <Link to="#" className="dropdown-item">Sao chép</Link>
                                    <Link to="#" className="dropdown-item example-delete-message"></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-footer">
                <form className="d-flex">
                    <div className="dropdown">
                        <button className="btn btn-light-info btn-floating mr-3" data-toogle="dropdown" title="Emoji" type="button">
                            <i className="mdi mdi-face"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-big p-0">
                            <div className="dropdown-menu-search">
                                <input type="text" className="form-control" placeholder="Tìm kiếm biểu cảm..."></input>
                            </div>
                            <div className="emojis chat-emojis">
                                <ul>
                                    <li>�3d�01</li>
                                    <li>�3d�02</li>
                                    <li>�3d�03</li>
                                    <li>�3d�04</li>
                                    <li>�3d�05</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-light-info btn-floating mr-3" data-toogle="dropdown" title="Emoji" type="button">
                            <i className="mdi mdi-plus"></i>
                        </button>
                        <div className="dropdown-menu">
                            <Link to="#" className="dropdown-item">Vị trí</Link>
                            <Link to="#" className="dropdown-item">Tệp</Link>
                            <Link to="#" className="dropdown-item">Tài liệu</Link>
                            <Link to="#" className="dropdown-item">File</Link>
                            <Link to="#" className="dropdown-item">Video</Link>
                        </div>
                    </div>
                    <input type="text" className="form-control form-control-main" placeholder="Nhập tin nhắn...." />
                    <div>
                        <button className="btn btn-primary ml-2 btn-floating" type="submit">
                            <i className="mdi mdi-send"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat;