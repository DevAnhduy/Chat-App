import React from 'react';
import Axios from 'axios';
import './SignUp.scss';
import { Link } from 'react-router-dom';

// export class  Login_Form extends React.Component{
//     submit_login = () => {
//         if(this.mobile.value && this.password.value){
//             Axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
//                 mobile: this.mobile.value,
//                 password: this.password.value,
//             })
//             .then((response) => {
//                 if(response.data){
//                     localStorage.setItem('token',`Bearer ${response.data.token}`)
//                     window.location = '/'
//                 }
//                 else
//                     alert('Sai tên tài khoản hoặc mật khẩu !')
//             })
//             .catch((error) => {
//                 alert('Sai tên tài khoản hoặc mật khẩu !')
//             })
//         }
//         else {
//             alert('Username và Password không được để trống !')
//         }
//     }
//     click_register = () => {
//         window.location = '/register'
//     }
//     render(){
//         return(
//             <div className="text-center main-login">
//                 <form>
//                     <div className="form-group">
//                         <label htmlFor="username">Số điện thoại</label>
//                         <input type="text" 
//                                id="mobile" 
//                                name="mobile" 
//                                className="form-control" 
//                                required
//                                ref={ input => this.mobile = input }
//                          />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Mật khẩu</label>
//                         <input type="password" 
//                                id="password" 
//                                name="password" 
//                                className="form-control" 
//                                required 
//                                 ref={ input => this.password = input }
//                                />
//                     </div>
//                     <div className="form-group" >
//                         <button onClick={this.submit_login} 
//                                 type="button" 
//                                 className="btn btn-login" >
//                             Đăng nhập
//                         </button>&emsp;
//                         <button onClick={this.click_register} 
//                                 type="button" 
//                                 className="btn btn-login" >
//                             Đăng ký
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

const SignIn = props => {
    return (
        <div className="layout">
            <div className="main order-md-2">
                <div className="start">
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
                                        <input type="text" id="mobile" className="form-control" placeholder="Số điện thoại" required></input>
                                        <button className="btn icon"><i className="mdi mdi-cellphone-sound"></i></button>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" id="name" className="form-control" placeholder="Họ và tên" required ></input>
                                        <button className="btn icon"><i className="mdi mdi-account"></i></button>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="password" className="form-control" placeholder="Password" required></input>
                                        <button className="btn icon"><i className="mdi mdi-lock"></i></button>
                                    </div>
                                    <button type="submit" className="btn button mt-4">Đăng ký</button>
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
                            <h2>Xin chào đã trở lại</h2>
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