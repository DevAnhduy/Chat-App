import React from 'react'
import login_style from './login.module.css';
import Axios from 'axios'

export class  Login extends React.Component{
    constructor(props){
        super(props);
    }
    submit_login = () => {
        //if(this.username.value !== undefined && this.password.value !== value){
        Axios.post('http://localhost:3001/login', {
                username: this.username.value,
                password: this.password.value},{
                    withCredentials: true
                })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => console.log(error))
        //}
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
                        <button onClick={this.submit_login} type="button" className="btn btn-info">
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}