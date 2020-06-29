import React from 'react'
import login_style from './login.module.css';
import Axios from 'axios'

export class  Login extends React.Component{
    submit_login = () => {
        if(this.username.value && this.password.value){
            Axios.post('http://localhost:3001/login', {
                username: this.username.value,
                password: this.password.value},{
                    withCredentials: true
                })
            .then((response) => {
                if(response.data.login_success){
                    window.location = '/'
                }
                else
                    alert('Sai tên tài khoản hoặc mật khẩu !')
            })
            .catch((error) => console.log(error))
        }
        else {
            alert('Username và Password không được để trống !')
        }
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
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}