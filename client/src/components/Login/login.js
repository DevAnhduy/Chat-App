import React from 'react';
import login_style from './login.module.css';
import Axios from 'axios';
const { __server } = require('config/constant.json');

export class  Login_Form extends React.Component{
    submit_login = () => {
        if(this.username.value && this.password.value){
            Axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
                username: this.username.value,
                password: this.password.value},{
                    withCredentials: true
                })
            .then((response) => {
                //window.localStorage.setItem('user',JSON.stringify({}))
                if(response.data){
                    window.localStorage.setItem('token',`Bearer ${response.data.token}`)
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
            <div className={`text-center ${login_style['main-login']}`}>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input type="text" 
                               id="username" 
                               name="username" 
                               className="form-control" 
                               required
                               ref={ input => this.username = input }
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
                        <button onClick={this.submit_login} type="button" className={`btn ${login_style['btn-login']}`} >
                            Đăng nhập
                        </button>&emsp;
                        <button onClick={this.click_register} type="button" className={`btn ${login_style['btn-login']}`} >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}