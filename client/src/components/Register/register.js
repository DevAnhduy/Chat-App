import React from 'react'
import register_style from './register.module.css';
import Axios from 'axios'

export class Register_Form extends React.Component {
    submit_register = () => {
        if (this.username.value && this.password.value) {
            Axios.post('http://localhost:3001/users', {
                username: this.username.value,
                password: this.password.value
            }, {
                withCredentials: true
            })
                .then((response) => {
                    alert('Tạo tài khoản thành công !')
                })
                .catch((error) => alert('Tài khoản đã tồn tại'))
        }
        else {
            alert('Username và Password không được để trống !')
        }
    }
    render() {
        return (
            <div className={`text-center ${register_style['main-register']}`}>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            required
                            ref={input => this.username = input}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            required
                            ref={input => this.password = input}
                        />
                    </div>
                    <div className="form-group" >
                        <button onClick={this.submit_register} type="button" className={`btn ${register_style['btn-register']}`} >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}