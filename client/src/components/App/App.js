import React, { useState, useEffect } from 'react';
import check_auth from 'utils/check-auth'
import { CIRCLE_LOADING } from 'components/Utils/circle_loading';
import { CHAT_ROOM } from './chat-room';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './App.scss';

const { __server } = require('config/constant.json')
const io = require('socket.io-client');
// Init global variable
let socket;
let user = {};
let list_chats = [];

const App = props => {
  const [is_auth,set_is_auth] = useState(false); //Check client is auth, default false 
  //const [load_list_chats,set_load_list_chats] = useState(false); //Check load list chat, default false
  const [re_render,set_re_render] = useState(false); //Variable to re render browser, default false
  const [list_chats,set_list_chats] = useState([]); 
  //Load user
  useEffect(() => {
    //Call function check auth 
    check_auth(is_auth => {
      if (is_auth) {
        user = is_auth; // Set variable user 
        socket = io(__server, {
          query: "authorization=" + window.localStorage.token
        }); // Connect socket io
        // Event socket io
        socket.on('/send-message', (msg) => {
          const main_message = document.getElementById('main-message');
          let wrap_message = document.createElement('div');
          if (msg.sender_id === user.user_id)
            wrap_message.className = 'messages sender';
          else
            wrap_message.className = 'messages';
          let span_message = document.createElement('span');
          span_message.innerHTML = `${msg.sender_name} : ${msg.content}`;
          wrap_message.appendChild(span_message);
          main_message.appendChild(wrap_message);
        })
        // Get all receiver detail
        user.list_chats.forEach((receiver,index) => {
          if(receiver.type === 'user'){
            Axios(`${process.env.REACT_APP_API_URL}/users/${receiver._id}`,{
              headers: { authorization: localStorage.token }
            })
              .then(response => {
                receiver.detail = response.data.data;
              })
              .catch(error => console.log(error))
          } 
          else {
            Axios(`${process.env.REACT_APP_API_URL}/chat/rooms/${receiver._id}`,{
              headers: { authorization: localStorage.token }
            })
              .then(response => {
                receiver.detail = response.data.data;
                console.log(receiver.detail)
              })
              .catch(error => console.log(error))
          }
        })
        set_is_auth(true);
      }
      else
        window.location = '/login'
    })
  },[]);
  //Render list chats
  const render_list_chats = () => {
    console.log(user.list_chats[0])
    if(user.list_chats){
      return (user.list_chats.map((receiver, index) => {
        console.log(receiver)
        return (
          // onClick={() => { this.join_room(room._id,'rooms');
          //                  this.render_message_in_room(room._id,'rooms')}} 
          <Link  
                key={index} 
                to={`/chat/${receiver._id}`}>
            <li>
              <CHAT_ROOM key={index} room_name={receiver.detail} />
            </li>
          </Link>
        )
      }))
    }
  }
  //Render 
  if(!is_auth)
    return <CIRCLE_LOADING />
  else{
    return (
      <div className="row chat-container">
        <div className={`col-3 chat-room `}>
          <div className="row mt-3">
            <div className="col-3">
              <Popup trigger={<div className="avatar" style={{ backgroundImage: `url("${user.avatar}")` }} ></div>}
                position="bottom left">
                <div className="user-settings-container">
                  <div className="user-setting-option">
                    Chỉnh sửa trang cá nhân
                      </div>
                  <div className="user-setting-option" >
                    {/* onClick={this.chat_with_user} */}
                    Chat với bạn bè
                      </div>
                  <div className="user-setting-option">
                    Đăng xuất
                      </div>
                </div>
              </Popup>
            </div>
            <div className="col-9">
              <button className="btn-add-chat-room">
                {/* onClick={this.create_room} */}
                Thêm phòng chat +
                  </button>
            </div>
          </div>
          <div>
            <ul style={{ listStyle: 'none', padding: 20 }}>
              {render_list_chats()}
              {/* {this.render_chat_with_user('5f50bf892f8c613814230aa7', 'users')}
              {this.render_chat_with_user('5f50bf8d2f8c613814230aa8', 'users')} */}
            </ul>
          </div>
        </div>
        <div className="col-9">
          <div id="main-message" >
            {/* {this.state.arr_message} */}
          </div>
          <form className="form-chat">
            <input id="message" autoComplete="off" />
            {/* ref={(input) => this.input_message = input} */}
            <button type="button">Send</button>
            {/* onClick={this.send_message} */}
          </form>
        </div>
      </div>
    )
  }
    
}



export default App;
// export class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       is_auth: false,
//       load_chat_rooms_done : false,
//       component_should_update: false,
//       arr_message : []
//     }
//   }
//   componentWillMount(){
//     check_auth(is_auth => {
//       if(is_auth){
//         user = is_auth;
//         socket = io(__server,{
//           query: "authorization=" + window.localStorage.token
//         });
//         socket.on('/send-message',(msg) => {
//           console.log(msg)
//           const main_message = document.getElementById('main-message');
//           let wrap_message = document.createElement('div');
//           if(msg.sender_id === user.user_id)
//             wrap_message.className = 'messages sender';
//           else 
//             wrap_message.className = 'messages';
//           let span_message = document.createElement('span');
//           span_message.innerHTML = `${msg.sender_name} : ${msg.content}`;
//           wrap_message.appendChild(span_message);
//           main_message.appendChild(wrap_message);
//         })
//         this.setState({ is_auth: true });
//       }
//       else
//         window.location = '/login'
//     })
//   }
//   componentDidMount(){
//     Axios(`${process.env.REACT_APP_API_URL}/users`,{
//       headers : {
//         authorization: localStorage.token
//       }
//     })
//       .then(response => {
//         user = response.data // Assignment response data to global variable
//         this.setState({component_should_update: true})
//       }) 
//       .catch(error => console.log(error))

    
//     // Axios.get(`${process.env.REACT_APP_API_URL}/chat/rooms`,
//     //   { headers: {
//     //     authorization : window.localStorage.token
//     //   }})
//     //   .then(response => {
//     //     arr_rooms_chat = response.data.rooms;
//     //     this.setState({ load_chat_rooms_done: true })
//     //   })
//     //   .catch(error => {
//     //     console.log(error)
//     //   })
//   }
//   send_message = () => {
//     if(this.input_message.value){
//       socket.emit('/send-message', { content: this.input_message.value });
//       document.getElementById('message').value = '';
//     }
//     else
//       alert('Tin nhắn không được để trống !');
//   }
//   create_room = () => {
//     const room_name = prompt('Nhập tên phòng muốn tạo');
//     if(room_name == null || room_name == '')
//       return;
//     else{
//       Axios.post(`${process.env.REACT_APP_API_URL}/chat/rooms`, 
//         {name: room_name },
//         { headers: {
//           authorization : window.localStorage.token
//         }})
//         .then(response => {
//           arr_rooms_chat.push(response.data)
//           this.setState({component_should_update: true})
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     }

//   }
//   join_room = (room_id,type) => {
//     socket.emit('/join-room',{ room_id,type });
//   }
//   chat_with_user = () => {
//     const friend_number = prompt('Nhập số điện thoại của bạn bè để chat : ')
//     if(friend_number === null || friend_number === '') alert('Số điện thoại trống')
//     else {
//       Axios.get(`${process.env.REACT_APP_API_URL}/users/${friend_number}`)
//         .then(response => {
//           if(response){
//             this.join_room(response.data._id,'user')
//           } else alert('Không thể tìm thấy người dùng với số điện thoại' + friend_number);
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     }
//   }
//   render_list_room = () => {
//     return (arr_rooms_chat.map((room, index) => {
//       return (
//         <Link onClick={() => { this.join_room(room._id,'rooms');this.render_message_in_room(room._id,'rooms')}}  
//               key={index} 
//               to={`/chat/${room._id}`}>
//           <li>
//             <CHAT_ROOM key={index} room_name={room.name} />
//           </li>
//         </Link>
//       )
//     }))
//   }
//   render_message_in_room = async (room_id,receiver_type) => {
//     let arr_message = [];
//     const get_messages = Axios.get(`${process.env.REACT_APP_API_URL}/chat/${receiver_type}/${room_id}/messages?page=1`, {
//       headers: {
//         authorization: localStorage.getItem('token')
//       }
//     }).then(response => {
//         arr_message = response.data.messages.map((message) => {
//           if (message.sender_id === user.user_id)
//             return (
//               <div className="messages sender">
//                 <span>{message.sender_name} : {message.content}</span>
//               </div>
//             )
//           else {
//             return (
//               <div className="messages">
//                 <span>{message.sender_name} : {message.content}</span>
//               </div>
//             )
//           }
//         })})
//     const get_users_in_chat = new Promise((resolve,reject) => {
//       if(receiver_type === 'user'){
//         Axios.get(`${process.env.REACT_APP_API_URL}/users/${room_id}`)
//       }
//       else {

//       }
//     })
//   }
//   render_chat_with_user = (receiver_id,type) => {
//     return (
//       <Link onClick={() => { this.join_room(receiver_id,type) ; this.render_message_in_room(receiver_id,type) }}  
//             to={`/chat/${receiver_id}`}>
//               <li>
//                 <CHAT_ROOM room_name='dev1' />
//               </li>
//       </Link>
//     )
//   }
//   render(){
//     if(!this.state.is_auth)
//       return <CIRCLE_LOADING />
//     else {
//      return (
//         <div className="row chat-container">
//           <div className={`col-3 chat-room `}>
//             <div className="row mt-3">
//               <div className="col-3"> 
//                 <Popup trigger={<div className="avatar" style={{backgroundImage:`url("${user.avatar}")`}} ></div>} 
//                        position="bottom left">
//                   <div className="user-settings-container">
//                     <div className="user-setting-option">
//                       Chỉnh sửa trang cá nhân
//                     </div>
//                     <div className="user-setting-option" onClick={this.chat_with_user}>
//                       Chat với bạn bè
//                     </div>
//                     <div className="user-setting-option">
//                       Đăng xuất
//                     </div>
//                   </div>
//                 </Popup>
//               </div>
//               <div className="col-9">
//                 <button onClick={this.create_room} className="btn-add-chat-room">
//                   Thêm phòng chat +
//                 </button>
//               </div>
//             </div>
//             <div>
//               <ul style={{listStyle:'none',padding:20}}>
//                 {this.render_list_room()}
//                 {this.render_chat_with_user('5f50bf892f8c613814230aa7','users')}
//                 {this.render_chat_with_user('5f50bf8d2f8c613814230aa8','users')}
//               </ul>
//             </div>
//           </div>
//           <div className="col-9">
//             <div id="main-message" >
//              {this.state.arr_message}
//             </div>
//             <form className="form-chat">
//               <input id="message" autoComplete="off" ref={(input) => this.input_message = input} />
//               <button onClick={this.send_message} type="button">Send</button>
//             </form>
//           </div>
//         </div>
//       )
//     }
//   }
// }
