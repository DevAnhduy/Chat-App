import React from 'react';
import Axios from 'axios';
import './Register.scss';

export class Register_Form extends React.Component {
    submit_register = () => {
        if (this.name.value && this.password.value && this.mobile.value) {
            Axios.post(`${process.env.REACT_APP_API_URL}/users`, {
                mobile: this.mobile.value,
                password: this.password.value,
                name: this.name.value
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
    render() {
        return (
            <div className="text-center main-register">
                <form>
                    <div className="form-group">
                        <label htmlFor="mobile">Số điện thoại</label>
                        <input type="text"
                            id="mobile"
                            name="mobile"
                            className="form-control"
                            required
                            ref={input => this.mobile = input}
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
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input type="text" 
                               id="name" 
                               name="name" 
                               className="form-control" 
                               required
                               ref={ input => this.name = input }
                         />
                    </div>
                    <div className="form-group" >
                        <button onClick={this.submit_register} 
                                type="button" 
                                className="btn btn-register" >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}