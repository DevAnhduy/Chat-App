import React from 'react';
import { Link } from 'react-router-dom';
import style from './Chat.module.scss';
import PerfectScroll from 'react-perfect-scrollbar';
import $ from 'jquery';

const Chat = props => {
    return (
        <div className="chat">
            <div className="chat-preloader d-none">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading....</span>
                </div>
            </div>
            <div className="no-message-content">
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
                        <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar user"/>
                    </figure>
                    <div>
                        <h5>Javascript</h5>
                        <small className="text-success">Online</small>
                    </div>
                </div>
                <div className="chat-header-action" data-intro-js="7">
                    <ul className="list-inline">
                        <li className="list-inline-item d-inline d-lg-none">
                            <a href="#" className="btn btn-danger btn-floating example-chat-close">
                                <i className="mdi mdi-arrow-left"></i>
                            </a>
                        </li>
                        <li className="list-inline-item" data-toggle="modal" title="Voice call" data-target="#voice_call_request" >
                            <a className="btn btn-success btn-floating voice-call-request">
                                <i className="mdi mdi-phone"></i>
                            </a>
                        </li>
                        <li className="list-inline-item" data-toggle="modal" title="Video call" data-target="#video_call_request" >
                            <a className="btn btn-warning btn-floating video-call-request">
                                <i className="mdi mdi-video-outline"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#" className="btn btn-dark btn-floating" data-toggle="dropdown">
                                <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
               
                                <a href="#" onClick={()=>$('#user-profile').addClass('open')} data-right-sidebar="user-profile" className="dropdown-item">Thông tin cá nhân</a>
                                <a href="#" className="dropdown-item example-close-selected-chat">Đóng chat</a>
                                <a href="#" className="dropdown-item">Thêm vào lưu trữ</a>
                                <a href="#" className="dropdown-item example-delete-chat">Xóa chat</a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item text-danger example-block-user">Chặn</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <PerfectScroll className="chat-body">
                <div className="messages">
                    <div className="message-item in">
                        <div className="message-avatar">
                            <figure className="avatar avatar-sm">
                                <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar" />
                            </figure>
                            <div>
                                <h5>Javascript</h5>
                                <div className="time">10:12</div>
                            </div>
                        </div>
                        <div className="message-content">
                            <div className="message-text">Test</div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Trả lời</a>
                                    <a href="#" className="dropdown-item">Chuyển tiếp</a>
                                    <a href="#" className="dropdown-item">Sao chép</a>
                                    <a href="#" className="dropdown-item example-delete-message">Xóa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="message-item out">
                        <div className="message-avatar">
                            <figure className="avatar avatar-sm">
                                <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar" />
                            </figure>
                            <div>
                                <h5>Javascript</h5>
                                <div className="time">10:12</div>
                            </div>
                        </div>
                        <div className="message-content">
                            <div className="message-text">Test</div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Trả lời</a>
                                    <a href="#" className="dropdown-item">Chuyển tiếp</a>
                                    <a href="#" className="dropdown-item">Sao chép</a>
                                    <a href="#" className="dropdown-item example-delete-message">Xóa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="message-item in">
                        <div className="message-avatar">
                            <figure className="avatar avatar-sm">
                                <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar" />
                            </figure>
                            <div>
                                <h5>Javascript</h5>
                                <div className="time">10:12</div>
                            </div>
                        </div>
                        <div className="message-content">
                            <div className="message-text">Test</div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Trả lời</a>
                                    <a href="#" className="dropdown-item">Chuyển tiếp</a>
                                    <a href="#" className="dropdown-item">Sao chép</a>
                                    <a href="#" className="dropdown-item example-delete-message">Xóa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="message-item in">
                        <div className="message-content">
                            <div className="message-text">Test</div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Trả lời</a>
                                    <a href="#" className="dropdown-item">Chuyển tiếp</a>
                                    <a href="#" className="dropdown-item">Sao chép</a>
                                    <a href="#" className="dropdown-item example-delete-message">Xóa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="message-item out">
                        <div className="message-avatar">
                            <figure className="avatar avatar-sm">
                                <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar" />
                            </figure>
                            <div>
                                <h5>Javascript</h5>
                                <div className="time">10:12</div>
                            </div>
                        </div>
                        <div className="message-content">
                            <div className="message-text">Test</div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Trả lời</a>
                                    <a href="#" className="dropdown-item">Chuyển tiếp</a>
                                    <a href="#" className="dropdown-item">Sao chép</a>
                                    <a href="#" className="dropdown-item example-delete-message">Xóa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="message-item out">
                        <div className="message-content">
                            <div className="message-text">Test</div>
                            <div className="dropdown">
                                <a href="#" data-toggle="dropdown">
                                    <i className="mdi mdi-dots-horizontal"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Trả lời</a>
                                    <a href="#" className="dropdown-item">Chuyển tiếp</a>
                                    <a href="#" className="dropdown-item">Sao chép</a>
                                    <a href="#" className="dropdown-item example-delete-message">Xóa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PerfectScroll>
            <div className="chat-footer">
                <form className="d-flex">
                    <div className="dropdown">
                        <button className="btn btn-danger btn-floating mr-3" data-toggle="dropdown" title="Emoji" type="button">
                            <i className="mdi mdi-face"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-big p-0">
                            <div className="dropdown-menu-search">
                                <input type="text" className="form-control" placeholder="Tìm kiếm biểu cảm..."></input>
                            </div>
                            <div className="emojis chat-emojis">
                                <ul>
                                    <li>😁</li>
                                    <li>😂</li>
                                    <li>😃</li>
                                    <li>😄</li>
                                    <li>😅</li>
                                    <li>😆</li>
                                    <li>😉</li>
                                    <li>😊</li>
                                    <li>😋</li>
                                    <li>😌</li>
                                    <li>😍</li>
                                    <li>😏</li>
                                    <li>😒</li>
                                    <li>😓</li>
                                    <li>😔</li>
                                    <li>😖</li>
                                    <li>😘</li>
                                    <li>😝</li>
                                    <li>😠</li>
                                    <li>😢</li>
                                    <li>🙅</li>
                                    <li>🙆</li>
                                    <li>🙇</li>
                                    <li>🙈</li>
                                    <li>🙉</li>
                                    <li>🙊</li>
                                    <li>🙋</li>
                                    <li>🙌</li>
                                    <li>🙍</li>
                                    <li>🙎</li>
                                    <li>🙏</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-danger btn-floating mr-3" data-toggle="dropdown" title="Emoji" type="button">
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