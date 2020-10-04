import React from 'react';

const Edit_Profile = props => {
    return (
        <div className="modal fade" id="edit_profile" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="mdi mdi-clipboard-edit-outline mr-2">  Sửa thông tin</i>
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="close">
                            <i className="mdi mdi-close"></i>
                        </button>
                    </div> 
                    <div className="modal-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#personal" role="tab" aria-controls="#personal">
                                    Cá nhân
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#about" role="tab" aria-controls="about">
                                    Tiểu sử
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#social-link" role="tab" aria-controls="social-link">
                                    Mạng xã hội
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="personal" role="tabpanel">
                                <form>
                                    <div className="form-group">
                                        <label for="fullname" className="col-form-label">Họ và tên</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="fullname" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="mdi mdi-account-outline"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="avatar" className="col-form-label">Hình đại diện</label>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <figure className="avatar mr-3">
                                                    <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar image" />
                                                </figure>
                                            </div>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="custom_file" />
                                                <label className="custom-file-label" for="custom_file">Chọn file</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="city" className="col-form-label">Thành phố</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="city" placeholder="Vd: Hồ Chí Minh"></input>
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="mdi mdi-map-marker-outline"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="phone" className="col-form-label">Số điện thoại</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" id="phone" placeholder="0366901840" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="mdi mdi-phone"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane" id="about" role="tabpanel">
                                <form>
                                    <div className="form-group">
                                        <label for="about-text" className="col-form-label">Ghi một vài từ để giới thiệu bản thân bạn</label>
                                        <textarea className="form-control" id="about-text"></textarea>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" for="customCheck1">Công khai</label>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane" id="social-link" role="tabpanel">
                                <form>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Facebook Link" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-facebook">
                                                    <i className="mdi mdi-facebook"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Twitter Link" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-twitter">
                                                    <i className="mdi mdi-twitter"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Instagram Link" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-instagram">
                                                    <i className="mdi mdi-instagram"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Linked Link" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-linkedin">
                                                    <i className="mdi mdi-linkedin"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Youtube Link" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-youtube">
                                                    <i className="mdi mdi-youtube"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Google Link" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-google">
                                                    <i className="mdi mdi-google"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Whatsapp Link" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-whatsapp">
                                                    <i className="mdi mdi-whatsapp"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit_Profile;