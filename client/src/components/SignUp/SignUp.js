import React, { useRef } from 'react';
import Axios from 'axios';
import './SignUp.scss';
import { Link } from 'react-router-dom';

const SignIn = props => {
    const mobile = useRef('');
    const name = useRef('');
    const password = useRef('');
    const submit_register = () => {
        if (name.current.value && password.current.value && mobile.current.value) {
            Axios.post(`${process.env.REACT_APP_API_URL}/users`, {
                mobile: mobile.current.value,
                password: password.current.value,
                name: name.current.value
            })
                .then((response) => {
                    alert('Tạo tài khoản thành công !')
                })
                .catch((error) => {
                    console.log(error)
                    alert('Tài khoản đã tồn tại')})
        }
        else {
            alert('Username và Password không được để trống !')
        }
    }
    return (
        <div className="layout-signup">
            <div className="main-signup order-md-2">
                <div className="wrapper-signup">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="content text-center">
                                <h1>Tạo tài khoản mới </h1>
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
                                <form className="sign-up">
                                    <div className="form-group">
                                        <input ref={mobile} type="text" name="mobile" className="form-control" placeholder="Số điện thoại" required></input>
                                        <button className="btn icon"><i className="mdi mdi-cellphone-sound"></i></button>
                                    </div>
                                    <div className="form-group">
                                        <input ref={name} type="text" name="name" className="form-control" placeholder="Họ và tên" required ></input>
                                        <button className="btn icon"><i className="mdi mdi-account"></i></button>
                                    </div>
                                    <div className="form-group">
                                        <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required></input>
                                        <button className="btn icon"><i className="mdi mdi-lock"></i></button>
                                    </div>
                                    <button type="button" onClick={submit_register} className="btn button mt-4">Đăng ký</button>
                                    <div className="callout">
                                        <span>Đã có tài khoản ? <Link to="/sign-in">Đăng nhập</Link></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="aside order-md-1">
                <div className="container">
                    <div className="col-md-12">
                        <div className="preference">
                            <h2>Xin chào</h2>
                            <p>Nếu như bạn đã có tài khoản. Hãy đăng nhập để giữ liên lạc với bạn bè</p>
                            <Link to="/sign-in" className="btn button">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default SignIn;