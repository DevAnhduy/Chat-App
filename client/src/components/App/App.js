import React from 'react';
import check_auth from 'utils/check-auth'
import { CIRCLE_LOADING } from 'components/Utils/circle_loading';
const app_style = require('./App.module.css');
const io = require('socket.io-client');
let socket;

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      is_auth: false
    }
  }
  componentWillMount(){
    check_auth(is_auth => {
      if(is_auth){
        socket = io('localhost:3001');
        this.setState({ is_auth: true });
      }
      else
        window.location = '/login'
    })
  }
  render(){
    if(this.state.is_auth){
      return (
        <div className="row">
          <div className={`col-3 ${app_style['chat-room']}`}>
            abc
          </div>
          <div className="col-9">
            <ul id={app_style.messages}></ul>
            <form className={app_style['form-chat']} action="">
              <input id="m" autoComplete="off" /><button>Send</button>
            </form>
          </div>
        </div>
      )
    }
    else {
      return <CIRCLE_LOADING />
    }
  }
}
