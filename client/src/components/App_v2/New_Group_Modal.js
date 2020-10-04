import React from 'react';

const New_Group_Modal = props => {
    return(
        <div className="modal fade show" id="new_room" tabIndex="-1" role="dialog" >
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="mdi mdi-account-group-outline mr-2" /> Tạo phòng chat
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Đóng">
                            <i className="mdi mdi-close" />
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="room_name" className="col-form-label">Tên phòng chat</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="room_name" />
                                    <div className="input-group-append">
                                        <button className="btn btn-success" data-toggle="dropdown" title="Emoji" type="button">
                                            <i className="mdi mdi-face" />
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-big dropdown-menu-right p-0">
                                            <div className="dropdown-menu-search">
                                                <input type="text" className="form-control" placeholder="Search emoji" />
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
                                </div>
                            </div>
                            <p className="mb-2">Thành viên phòng chat</p>
                            <div className="form-group">
                                <div className="avatar-group">
                                    <figure className="avatar" data-toggle="tooltip" title data-original-title="Tobit Spraging">
                                        <span className="avatar-title bg-success rounded-circle">T</span>
                                    </figure>
                                    <figure className="avatar" data-toggle="tooltip" title data-original-title="Cloe Jeayes">
                                        <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                </div>
                                <button type="button" className="btn btn-light" title="Add User" data-toggle="dropdown">
                                    Thêm bạn bè
                                </button>
                                <div className="dropdown-menu p-0">
                                    <div className="dropdown-menu-search">
                                        <input type="text" className="form-control" placeholder="Search users" />
                                    </div>
                                    <div className="px-3 pb-3">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex align-items-center px-0">
                                                <div className="mr-2">
                                                    <figure className="avatar avatar-sm">
                                                        <span className="avatar-title bg-info rounded-circle">N</span>
                                                    </figure>
                                                </div>
                                                <div>NodeJS</div>
                                                <button type="button" className="btn ml-auto text-primary">Thêm</button>
                                            </li>
                                            <li className="list-group-item d-flex align-items-center px-0">
                                                <div className="mr-2">
                                                    <figure className="avatar avatar-sm">
                                                        <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jp" className="rounded-circle" alt="image" />
                                                    </figure>
                                                </div>
                                                <div>Javascript</div>
                                                <button type="button" className="btn ml-auto text-primary">Thêm</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="col-form-label">Mô tả</label>
                                <textarea className="form-control" id="description" defaultValue={""} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Tạo phòng chat</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default New_Group_Modal;