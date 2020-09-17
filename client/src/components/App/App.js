import React, { useState, useEffect, useRef } from 'react';
import check_auth from 'utils/check-auth'
import { CIRCLE_LOADING } from 'components/Utils/circle_loading';
import { CHAT_BLOCK } from './Chat_Block';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './App.scss';

const { __server } = require('config/constant.json')
const io = require('socket.io-client');
// Init global variable
let socket;

const App = props => {
  //#region State
  const [is_auth,set_is_auth] = useState(false); //Check client is auth, default false
  const [re_render,set_re_render] = useState(false); //Variable to re render browser, default false
  const [user,set_user] = useState({});
  const [list_chats,set_list_chats] = useState([]);
  const [obj_receivers,set_obj_receiver] = useState({});
  const [load_list_chats_done,set_load_list_chats] = useState(false);
  const [load_messages,set_load_messages] = useState(false);
  //#endregion
  //#region Ref
  const input_message = useRef(null);
  //#endregion
  //#region Effect
  //Load user
  useEffect(() => {
    console.log('Check auth')
    //Call function check auth
    check_auth(is_auth => {
      if (is_auth) {
        set_user(is_auth) // Set variable user
        set_is_auth(true)
      }
      else
        window.location = '/login'
    })
  },[]);
  //Load list chats && connect socket io
  useEffect(() => {
    if(user.list_chats){
      //Connect socket io
      socket = io(__server, { // Connect socket io
        query: "authorization=" + window.localStorage.token
      });
      //Generate event socket io
      socket.on('/receiver-message', (msg) => {
          //Get main message element
          const main_message = document.getElementById('main-message');
          //Create div wrap message
          let wrap_message = document.createElement('div');
          //Set class name for wrap message
          if (msg.sender_id === user._id)
            wrap_message.className = 'messages sender';
          else {
            wrap_message.className = 'messages';
            //Create div  element for avatar
            let avatar_message = document.createElement('div');
            avatar_message.className = "avatar-message";
            avatar_message.style.backgroundImage = `url("${obj_receivers[msg.sender_id].avatar}")`;
            //Append avatar message in wrap message
            wrap_message.appendChild(avatar_message);
          }
          //Create span element for message
          let span_message = document.createElement('span');
          span_message.innerHTML = `${msg.content}`;
          //Append span message in wrap message
          wrap_message.appendChild(span_message);
          //Append wrap message in main message
          main_message.appendChild(wrap_message);
          main_message.scrollTop = main_message.scrollHeight;
      })
      console.log('Load list chat')
      let arr_promise = []; // Array contain all axios request
      user.list_chats.forEach((receiver,index) => {
        if(receiver.type === 'users'){
          arr_promise.push(
            Axios(`${process.env.REACT_APP_API_URL}/users/${receiver._id}`,{
              headers: { authorization: localStorage.token }
            })
          )
        }
        else {
          arr_promise.push(
            Axios(`${process.env.REACT_APP_API_URL}/chat/rooms/${receiver._id}`,{
              headers: { authorization: localStorage.token }
            })
          )
        }
        //Check last element then call promise all
        if(index === user.list_chats.length - 1) {
          console.log('Last')
          Promise.all(arr_promise)
            .then((receivers) => {
              console.log('Data coming !');
              //Add detail to list chats
              receivers.forEach(receiver => {
                const receiver_index = user.list_chats.findIndex(element => element._id === receiver.data.data._id);
                user.list_chats[receiver_index].detail = receiver.data.data;
              })
              //Set list chats
              set_list_chats(user.list_chats.map((receiver,index) => {
                return (
                  <Link key={index}
                        id={receiver._id}
                        to={`/chat/${receiver._id}`}
                        onClick={() => { start_chat(receiver) }}
                  >
                    <li>
                      <CHAT_BLOCK key={index}
                                  name={receiver.detail ? receiver.detail.name : ''}
                                  avatar={receiver.detail.avatar ? receiver.detail.avatar : ''}
                                 />
                    </li>
                  </Link>
                )
              }))
              set_obj_receiver(obj_receivers[user._id] = user)
            })
        }
      })
    } ;
  },[user])
  //#endregion
  //#region Function logic
  const send_message = (e,receiver_id) => {
    e.preventDefault();
    console.log('Send message');
    if (input_message.current.value) {
      socket.emit('/send-message', {
        content: input_message.current.value,
        sender_id: user._id,
        receiver_id
       });
      document.getElementById('message').value = '';
    }
    else
      alert('Tin nhắn không được để trống !');
  }
  const create_room = () => {
    const room_name = prompt('Nhập tên phòng muốn tạo');
    if(room_name == null || room_name == '')
      return;
    else {
      Axios.post(`${process.env.REACT_APP_API_URL}/chat/rooms`,
        { name: room_name },
        { headers: {
          authorization : localStorage.token
        }})
        .then(response => {
          console.log('Room created !');
          const receiver = response.data.data;
          let list_chats_updated = list_chats;
          const new_ele_room = (
            <Link
              key={list_chats_updated.length}
              to={`/chat/${receiver._id}`}>
              <li>
                <CHAT_BLOCK key={list_chats_updated.length}
                            name={receiver ? receiver.name : ''}
                            onClick={start_chat(receiver._id,'room')}
                            />
              </li>
            </Link>
          )
          set_list_chats([new_ele_room,...list_chats])
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  const start_chat = (receiver) => {
    console.log('Start chat')
    // Join socket
    socket.emit('/start-chat',{
      _id : receiver._id,
      type: receiver.type
    })
    // Load obj receivers information
    if(receiver.type === 'users'){
      set_obj_receiver(obj_receivers[receiver._id] = receiver.detail);
      get_all_message(receiver);
    }
    else {
      let str_query_users = '';
      receiver.detail.members.map((member,index) => {
        str_query_users += `_id=${member}&`;
        if(index === receiver.detail.members.length - 1) {
          Axios.get(`${process.env.REACT_APP_API_URL}/users?${str_query_users}`,{
            headers : {
              authorization : localStorage.token
            }
          })
            .then(members => {
              members.data.data.map((member) => {
                set_obj_receiver(obj_receivers[member._id] = member);
                get_all_message(receiver);
              })
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
    // Active chat block DOM
    const chat_block_selected = document.getElementById(receiver._id);
    const element_chat_block = chat_block_selected.getElementsByClassName("chat-block");
    const list_chat_blocks = document.getElementsByClassName("row chat-block active");
    if (list_chat_blocks.length){
      list_chat_blocks[0].classList = ("row chat-block");
      element_chat_block[0].classList = ("row chat-block active");
    }
    else
      element_chat_block[0].classList = ("row chat-block active")
  }
  const get_all_message = (receiver) => {
    console.log('Get messages');
    // Get main message element
    const main_message = document.getElementById('main-message');
    const wrapper_receiver_info = document.createElement("div");
    wrapper_receiver_info.classList = "wrapper-receiver-info";
    // Div avatar
    const div_avatar = document.createElement("div");
    div_avatar.classList = "receiver-info-avatar";
    div_avatar.style.backgroundImage = `url(${receiver.detail.avatar})`;
    // Div name
    const div_name = document.createElement("div");
    div_name.innerHTML = receiver.detail.name;
    div_name.classList = "receiver-info-name";
    // Div icon
    const div_icon = document.createElement("div");
    div_icon.classList = "receiver-info-icon";
    const create_icon_info = document.createElement("i")
    create_icon_info.classList = "material-icons";
    create_icon_info.innerHTML = "info";
    div_icon.appendChild(create_icon_info);
    // Append
    wrapper_receiver_info.appendChild(div_avatar);
    wrapper_receiver_info.appendChild(div_name);
    wrapper_receiver_info.appendChild(div_icon);
      
    Axios.get(`${process.env.REACT_APP_API_URL}/chat/${receiver.type}/${receiver._id}/messages?page=1`,{
      headers: {
        authorization: localStorage.token
      }
    })
      .then(response => {
        main_message.innerHTML = '';
        main_message.appendChild(wrapper_receiver_info);
        //Loop all message
        response.data.messages.map((message) => {
          //Create div wrap message
          let wrap_message = document.createElement('div');
          //Set class name for wrap message
          if (message.sender_id === user._id)
            wrap_message.className = 'messages sender';
          else {
            wrap_message.className = 'messages';
            //Create div  element for avatar
            let avatar_message = document.createElement('div');
            avatar_message.className = "avatar-message";
            avatar_message.style.backgroundImage = `url("${obj_receivers[message.sender_id].avatar}")`
            //Append avatar message in wrap message
            wrap_message.appendChild(avatar_message);
          }
          // Create span element for message
          let span_message = document.createElement('span');
          span_message.innerHTML = `${message.content}`;
          // Append span message in wrap message
          wrap_message.appendChild(span_message);
          // Append wrap message in main message
          main_message.appendChild(wrap_message);
        })
        main_message.scrollTop = main_message.scrollHeight;
      })
      .catch(error => {
        console.log(error)
        main_message.innerHTML = '';
        main_message.appendChild(wrapper_receiver_info);
      })
  }
  //#endregion
  //#region Render
  if(!is_auth)
    return <CIRCLE_LOADING />
  else {
    console.log('Render')
    return (
      <div className="row chat-container">
        <div className="col-3 list-chat-room">
          <div className="row mt-3">
            <div className="col-2">
              <Popup trigger={<div className="avatar" style={{ backgroundImage: `url("${user.avatar}")` }}></div>}
                     position="bottom left"
                     on="hover"
              >
                <div className="user-settings-container">
                  <div className="user-setting-option">
                    Chỉnh sửa trang cá nhân
                  </div>
                  <div className="user-setting-option" >
                    Chat với bạn bè
                  </div>
                  <div className="user-setting-option">
                    Đăng xuất
                  </div>
                </div>
              </Popup>
            </div>
            <div className="col-6 large-text">
              Let's talk
            </div>
            <div className="col-4 tools-bar">
              <Popup trigger={<div className="small-icon"
                onClick={create_room}>
                <i className="material-icons">group_add</i>
              </div>}
                on="hover"
              >
                <div className="popup-small-text">Tạo phòng chat</div>
              </Popup>
              <Popup trigger={<div className="small-icon"
                onClick={create_room}>
                <i className="material-icons">settings</i>
              </div>}
                on="hover"
              >
                <div className="popup-small-text">Cài đặt, trợ giúp</div>
              </Popup>
              <Popup trigger={<div className="small-icon"
                onClick={create_room}>
                <i className="material-icons">group_add</i>
              </div>}
                on="hover"
              >
                <div className="popup-small-text">Tạo phòng chat</div>
              </Popup>
            </div>
            
          </div>
          <div className="row mt-4">
            <input type="text" 
                   className="search-bar" 
                   placeholder="Tìm kiếm tên bạn bè, hoặc tên phòng" >
            </input>
          </div>
          <div>
            <ul className="list-chats">
              {list_chats.length ? list_chats : <CIRCLE_LOADING width="100%" height="50vh" />}
            </ul>
          </div>
        </div>
        <div className="col-9 p-0" style={{height:"100vh"}}>
          <div id="main-message" >
            <CIRCLE_LOADING width="100%" />
          </div>
          <form className="form-chat"
                onSubmit={(e) => {send_message(e,props.match.params.receiver_id)}}
                method="POST"
          >
            <input id="message"
                   ref={input_message}
                   autoComplete="off"
                   placeholder="Nhập tin nhắn ở đây ..."
                   onKeyPress={(e) => console.log(e.key)}
            />
          </form>
        </div>
      </div>
    )
  }
  //#endregion
}

export default App;
