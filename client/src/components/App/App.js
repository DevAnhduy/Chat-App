import React from 'react';
import check_auth from 'utils/check-auth'
import { CIRCLE_LOADING } from 'components/Utils/circle_loading';
import { CHAT_ROOM } from './chat-room';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './App.scss';

const { __server } = require('config/constant.json')
//const app_style = require('./App.module.css');
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
      component_should_update: false,
      arr_message : []
    }
  }
  componentWillMount(){
    check_auth(is_auth => {
      if(is_auth){
        socket = io(__server,{
          query: "authorization=" + window.localStorage.token
        });
        // socket.on('connect',() => {
        //   // const user = jwt_decode(localStorage.getItem('token').split(' ')[1]);
        //   // socket.io.engine.id = user.user_id;
        //   // socket.id = user.user_id;
        //   console.log(socket)
        // })
        socket.on('/send-message',(msg) => {
          const main_message = document.getElementById('main-message');
          let msg_element = document.createElement('ul');
          msg_element.innerHTML = `${msg.sender} : ${msg.content}`;
          // msg_element.className = app_style.messages;
          msg_element.className = 'messages';
          main_message.appendChild(msg_element)
        })
        socket.on('/send-message/room',(msg) => {
          const main_message = document.getElementById('main-message');
          let msg_element = document.createElement('ul');
          msg_element.innerHTML = `${msg.sender} : ${msg.content}`;
          //msg_element.className = app_style.messages;
          msg_element.className = 'messages';
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
    Axios.get(`${process.env.REACT_APP_API_URL}/chat/rooms`,
      { headers: {
        authorization : window.localStorage.token
      }})
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
      //socket.emit('/send-message', { content: this.input_message.value });
      socket.emit('/send-message', { content: this.input_message.value });
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
  join_room = (room_id,type) => {
    socket.emit('/join-room',{ room_id,type });
  }
  chat_with_user = (receiver_id) => {
    socket.emit('/chat-with-user',{receiver_id})
  }
  render_list_room = () => {
    return (arr_rooms_chat.map((room, index) => {
      return (
        <Link onClick={() => { this.join_room(room._id,'rooms');this.render_message_in_room(room._id)}}  
              key={index} 
              to={`/chat/${room._id}`}>
          <li>
            <CHAT_ROOM key={index} room_name={room.name} />
          </li>
        </Link>
      )
    }))
  }
  render_message_in_room = (room_id,receiver_type) => {
    let arr_message = [];
    Axios.get(`${process.env.REACT_APP_API_URL}/chat/${receiver_type}/${room_id}/messages/most-recent?offset=1`,{
      headers:{
        authorization : localStorage.getItem('token')
      }
    })
      .then(messages => {
        // { app_style.messages }
        arr_message = messages.data.map((message) => {
          return <ul className="messages">{message.sender_name} : {message.content} </ul>
        })
        if(arr_message.length){
          this.setState({arr_message: arr_message})
        }
      })
      .catch(error => {
        this.setState({arr_message: []})
      })
  }
  render_chat_with_user = (receiver_id,type) => {
    //;this.render_message_in_room(room._id)
    return (
      <Link onClick={() => { this.join_room(receiver_id,type) ; this.render_message_in_room(receiver_id,type) }}  
            to={`/chat/${receiver_id}`}>
              <li>
                <CHAT_ROOM room_name='dev1' />
              </li>
      </Link>
    )
  }
  render(){
    if(!this.state.is_auth)
      return <CIRCLE_LOADING />
    else {
     return (
        <div className="row">
         {/* ${app_style['chat-room']} */}
          <div className={`col-3 chat-room `}>
            <div className="row">
              <div className="col mt-3">
               {/* {app_style['btn-add-chat-room']} */}
                <button onClick={this.create_room} className="btn-add-chat-room">Thêm phòng chat +</button>
              </div>
            </div>
            <div>
              <ul style={{listStyle:'none',padding:20}}>
                {this.render_list_room()}
                {this.render_chat_with_user('5f3b3f1c9e0428154021f25b','users')}
                {this.render_chat_with_user('5f3b3e719e0428154021f25a','users')}
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div id="main-message" >
             {/* //{this.render_message_in_room(this.props.match.params.room_id)} */}
             {this.state.arr_message}
            </div>
           {/* {app_style['form-chat']} */}
            <form className="form-chat">
              <input id="message" autoComplete="off" ref={(input) => this.input_message = input} />
              <button onClick={this.send_message} type="button">Send</button>
            </form>
          </div>
        </div>
      )
    }
  }
}
