import React, { createElement } from 'react';
import check_auth from 'utils/check-auth'
import { CIRCLE_LOADING } from 'components/Utils/circle_loading';
import { CHAT_ROOM } from './chat-room';
import Axios from 'axios';
import { Link } from 'react-router-dom';
const { __server } = require('config/constant.json')
const app_style = require('./App.module.css');
const io = require('socket.io-client');
const jwt_decode = require('jwt-decode');
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
        socket = io(__server,{
          query: "authorization=" + window.localStorage.token
        });
        socket.on('connect',() => {
          // const user = jwt_decode(localStorage.getItem('token').split(' ')[1]);
          // socket.io.engine.id = user.user_id;
          // socket.id = user.user_id;
          console.log(socket)
        })
        socket.on('/send-message',(msg) => {
          const main_message = document.getElementById('main-message');
          let msg_element = document.createElement('ul');
          msg_element.innerHTML = `${msg.sender} : ${msg.content}`;
          msg_element.className = app_style.messages;
          main_message.appendChild(msg_element)
        })
        socket.on('/send-messages/users',(msg) => {
          const main_message = document.getElementById('main-message');
          let msg_element = document.createElement('ul');
          msg_element.innerHTML = `${msg.sender} : ${msg.content}`;
          msg_element.className = app_style.messages;
          main_message.appendChild(msg_element)
        })
        socket.on('test',(msg) =>{
          alert(msg.data)
        })
        this.setState({ is_auth: true });
      }
      else
        window.location = '/login'
    })
  }
  componentDidMount(){
    Axios.get('http://localhost:3001/chat/rooms',
    { headers: {
      authorization : window.localStorage.token
    }})
      .then(response => {
        console.log(response)
        arr_rooms_chat = response.data;
        this.setState({ load_chat_rooms_done: true })
      })
      .catch(error => {
        console.log(error)
      })
  }
  send_message = () => {
    if(this.input_message.value){
      //socket.emit('/send-message', { content: this.input_message.value });
      socket.emit('/send-messages/users', { content: this.input_message.value });
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
      Axios.post('http://localhost:3001/chat-rooms', { room_name: room_name }, { withCredentials: true })
        .then(response => {
          arr_rooms_chat.push(response.data)
          this.setState({component_should_update: true})
        })
        .catch(error => {
          console.log(error)
        })
    }

  }
  join_room = (room_id) => {
    socket.emit('/join-room',{ room_id : room_id});
  }
  render_list_room = () => {
    arr_rooms_chat =  arr_rooms_chat.map((room, index) => {
      return (
        <Link onClick={() => this.join_room(room._id)} key={index} to={`/chat-rooms/${room._id}`}>
          <li>
            <CHAT_ROOM key={index} room_name={room.name} />
          </li>
        </Link>
      )
    })
    arr_rooms_chat.push(
      <Link onClick={() => socket.emit('/chat/users', { receiver_id: '5ee8df57c8fd122728a6a045' })} key={10} to={`/chat-rooms/5ee8df57c8fd122728a6a045`}>
        <li>
          <CHAT_ROOM key={10} room_name={'anhduy'} />
        </li>
      </Link>
    )
    return arr_rooms_chat
  }
  // render_message_in_room = (room_id) => {
  //   const room = arr_rooms_chat.find(room => room._id == room_id);
  //   if(room){
  //     return (
  //       room.messages.map(message => {
  //         return <ul className={app_style.messages}>{message.sender.username} : {message.content} </ul>
  //       })
  //     )
  //   }
  //   else{
  //     const main_message = document.getElementById('main-message');
  //     if (main_message)
  //       main_message.innerHTML = '';
  //   }
  // }
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
            <div>
              <ul style={{listStyle:'none',padding:20}}>
                {this.render_list_room()}
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div id="main-message" >
             {/* {this.render_message_in_room(this.props.match.params.room_id)} */}
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
