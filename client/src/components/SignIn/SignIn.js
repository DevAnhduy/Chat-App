import React from 'react';
import {Link} from 'react-router-dom';

const SignIn = props => {
    return(
        <div className="layout">
            <div className="main order-md-2">
                <div className="start">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="content text-center">
                                <h1>Đăng nhập vào FSNET </h1>
                                <div className="third-party">
                                    <button className="btn btn-facebook item">
                                        <i className="mdi mdi-facebook"></i>
                                    </button>
                                    <button className="btn btn-google item">
                                        <i className="mdi mdi-google"></i>
                                    </button>
                                    <button className="btn btn-github item">
                                        <i className="mdi mdi-github"></i>
                                    </button>
                                </div>
                                <form className="sign-in">
                                    <div className="form-group">
                                        <input type="text" id="mobile" className="form-control" placeholder="Số điện thoại" required></input>
                                        <button className="btn icon"><i className="mdi mdi-cellphone-sound"></i></button>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="password" className="form-control" placeholder="Password" required></input>
                                        <button className="btn icon"><i className="mdi mdi-lock"></i></button>
                                    </div>
                                    <button type="submit" className="btn button mt-4">Đăng nhập</button>
                                    <div className="callout">
                                        <span>Chưa có tài khoản ? <Link to="/sign-up">Đăng ký</Link></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="aside order-md-2">
                <div className="container">
                    <div className="col-md-12">
                        <div className="preference">
                            <h2>Xin chào</h2>
                            <p>Nếu như bạn chưa có tài khoản. Hãy đăng ký để tạo tài khoản</p>
                            <Link to="/sign-up" className="btn button">Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;