import React from 'react';
import Axios from 'axios'
const app_style = require('./App.module.css');
const io = require('socket.io-client');
const socket = io('localhost:3001');

export class App extends React.Component{
  componentWillMount(){
    Axios.get('http://localhost:3001',{ withCredentials:true })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
  render(){
    return(
      <div>
        <ul id={app_style.messages}></ul>
        <form className={app_style['form-chat']} action="">
          <input id="m" autoComplete="off" /><button>Send</button>
        </form>
      </div>
    )
  }
}
