import React from 'react';
import Axios from 'axios';
import './Login.scss';

export class  Login_Form extends React.Component{
    submit_login = () => {
        if(this.mobile.value && this.password.value){
            Axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
                mobile: this.mobile.value,
                password: this.password.value,
            })
            .then((response) => {
                if(response.data){
                    localStorage.setItem('token',`Bearer ${response.data.token}`)
                    window.location = '/'
                }
                else
                    alert('Sai tên tài khoản hoặc mật khẩu !')
            })
            .catch((error) => {
                alert('Sai tên tài khoản hoặc mật khẩu !')
            })
        }
        else {
            alert('Username và Password không được để trống !')
        }
    }
    click_register = () => {
        window.location = '/register'
    }
    render(){
        return(
            <div className="text-center main-login">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Số điện thoại</label>
                        <input type="text" 
                               id="mobile" 
                               name="mobile" 
                               className="form-control" 
                               required
                               ref={ input => this.mobile = input }
                         />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password" 
                               id="password" 
                               name="password" 
                               className="form-control" 
                               required 
                                ref={ input => this.password = input }
                               />
                    </div>
                    <div className="form-group" >
                        <button onClick={this.submit_login} 
                                type="button" 
                                className="btn btn-login" >
                            Đăng nhập
                        </button>&emsp;
                        <button onClick={this.click_register} 
                                type="button" 
                                className="btn btn-login" >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
