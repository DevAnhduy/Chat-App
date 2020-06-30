import React from 'react';
import check_auth from 'utils/check-auth'
import { CIRCLE_LOADING } from 'components/Utils/circle_loading';
import { CHAT_ROOM } from './chat-room';
import Axios from 'axios';
const app_style = require('./App.module.css');
const io = require('socket.io-client');
let socket;
let arr_rooms_chat = [];

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      is_auth: false,
      load_chat_rooms_done : false,
      component_should_update: false
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
  componentDidMount(){
    Axios.get('http://localhost:3001/chat-rooms',{withCredentials: true})
      .then(response => {
        arr_rooms_chat = response.data;
        this.setState({ load_chat_rooms_done: true })
      })
      .catch(error => {
        console.log(error)
      })
  }
  send_message = () => {
    if(this.input_message.value){
      socket.emit('send_message', { message: this.input_message.value });
      document.getElementById('message').value = '';
    }
    else
      alert('Tin nhắn không được để trống !');
  }
  create_room = () => {
    const room_name = prompt('Nhập tên phòng muốn tạo');
    if(room_name == null || room_name == '')
      return;
    else{
      Axios.post('http://localhost:3001/chat-rooms',{room_name : room_name})
        .then(response => {
          alert(`Room ${room_name} đã được tạo`);
          this.setState({component_should_update: true})

        })
        .catch(error => {
          console.log(error)
        })
    }

  }
  render(){
    if(!this.state.is_auth)
      return <CIRCLE_LOADING />
    else {
     return (
        <div className="row">
          <div className={`col-3 ${app_style['chat-room']}`}>
            <div className="row">
              <div className="col mt-3">
                <button onClick={this.create_room} className={app_style['btn-add-chat-room']}>Thêm phòng chat +</button>
              </div>
            </div>
            { arr_rooms_chat.map((room,index) => { return <CHAT_ROOM key={index} room_name={room.name} /> })}
          </div>
          <div className="col-9">
            <div className="main-message">
              <ul id={app_style.messages}>a</ul>
            </div>
            <form className={app_style['form-chat']}>
              <input id="message" autoComplete="off" ref={(input) => this.input_message = input} />
              <button onClick={this.send_message} type="button">Send</button>
            </form>
          </div>
        </div>
      )
    }
  }
}
