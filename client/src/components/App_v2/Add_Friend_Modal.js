import React from 'react';

const Add_Friend_Modal = props => {
    return (
        <div className="modal fade" id="add_friend" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="mdi mdi-account-plus-outline"> Thêm bạn bè</i>
                        </h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Đóng">
                            <i className="mdi mdi-close"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="mb-4">
                            <div className="form-group">
                                <label for="add_with_mobile" className="col-form-label">Số điện thoại</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" id="add_with_mobile" placeholder="Số điện thoại" />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-success">
                                            <i className="mdi mdi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="d-flex justify-content-between">
                            <span>Người dùng</span>
                            <span className="text-muted small">Có 1 người được chọn</span>
                        </div>
                        <hr />
                        <div>
                            <ul className="list-group list-group-unlined">
                                <li className="list-group-item px-0 d-flex">
                                    <figure className="avatar mr-3">
                                        <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="image" />
                                    </figure>
                                    <div>
                                        <div>Javascript</div>
                                        <div className="small text-muted">0366901840</div>
                                    </div>
                                    <a className="text-danger ml-auto" data-toggle="tooltip" title="Xoá">
                                        <i className="mdi mdi-delete-outline"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Gửi lời mời</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add_Friend_Modal;