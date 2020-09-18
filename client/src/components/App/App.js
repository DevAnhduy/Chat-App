import React, { useState, useEffect, useRef } from 'react';
import check_auth from 'utils/check-auth'
import { CIRCLE_LOADING } from 'components/Utils/circle_loading';
import { CHAT_BLOCK } from './Chat_Block';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import call_api from '../../utils/call_api';
import './App.scss';
import socket_handle_factory from './socket_handle_factory';

const { __server } = require('config/constant.json')
const io = require('socket.io-client');
// Init global variable
let socket;

const App = props => {
  //#region State
  //const [is_auth,set_is_auth] = useState(false); //Check client is auth, default false
  const [re_render,set_re_render] = useState(false); //Variable to re render browser, default false
  const [user,set_user] = useState({});
  const [list_chats,set_list_chats] = useState([]); 
  const [obj_receivers,set_obj_receiver] = useState({}); //Object receivers
  //#endregion
  //#region Ref
  const input_message = useRef(null);
  //#endregion
  //#region Effect
  //Load user
  useEffect(() => {
    //Call function check auth
    check_auth(is_auth => {
      if (is_auth) {
        set_user(is_auth) // Set variable user
      }
      else
        window.location = '/login';
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
      socket_handle_factory.receiver_from_server.message(socket,user,obj_receivers);
      load_list_chats();
    } ;
  },[user])
  //#endregion
  //#region Function logic
  const load_list_chats = () => {
    console.log('Load list chat')
    let arr_request = []; // Array contain all axios request
    user.list_chats.forEach((receiver,index) => {
        const api_get_user = `${process.env.REACT_APP_API_URL}/users/${receiver._id}`;
        const api_get_rooms = `${process.env.REACT_APP_API_URL}/chat/rooms/${receiver._id}`;
        const api_get_recevier = receiver.type === 'rooms' ? api_get_rooms : api_get_user;
        arr_request.push(
          call_api({
            url : api_get_recevier,
            method: 'get'
          })
        )
        //Check last element then call promise all
        if(index === user.list_chats.length - 1) {
          Promise.all(arr_request)
            .then((receivers) => {
              //Add detail to list chats
              receivers.forEach(receiver => {
                const receiver_index = user.list_chats.findIndex(user_in_list_chat => user_in_list_chat._id === receiver.data.data._id);
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
  }
  const send_message = (e,receiver_id) => {
    e.preventDefault();
    if (input_message.current.value) {
      socket_handle_factory.send_to_server.message({
        socket,
        user,
        receiver_id,
        message : input_message.current.value
      })
      document.getElementById('message').value = '';
    }
    else
      alert('Tin nhắn không được để trống !');
  }
  const create_room = () => {
    //#region //* READ ME. DOCUMENTATION
    /**
     * * Function process :
     *    1. Get room name of alert box
     *    2. If exist room name then call api create room
     *    3. If response add chat block to list chats state
     * * Result : create one room & save in database
     */
    //#endregion
    //#region //* FUNCTION HANDLE
      //Step 1
      const room_name = prompt('Nhập tên phòng muốn tạo');
      if(room_name == null || room_name == '')
        return;
      else {
        //Step 2
        call_api({
          url : `${process.env.REACT_APP_API_URL}/chat/rooms`,
          method : 'post',
          data : {
            name: room_name
          }
        })
          .then(response => {
            //Step 3
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
    //#endregion
  }
  const load_obj_receiver_infomation = (receiver) => {
    //#region //* READ ME. DOCUMENTATION
      /**
       * @param receiver Object receiver
       * * Function process :
       * * Result : set state obj_receiver
       */
    //#endregion
    //#region //* FUNCTION HANDLE
      if(receiver.type === 'users'){
        set_obj_receiver(obj_receivers[receiver._id] = receiver.detail);
        get_all_message(receiver);
      }
      else {
        let str_query_users = '';
        receiver.detail.members.map((member,index) => {
          str_query_users += `_id=${member}&`;
          if(index === receiver.detail.members.length - 1) {
            call_api({
              url : `${process.env.REACT_APP_API_URL}/users?${str_query_users}`
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
    //#endregion
  }
  const set_active_chat_block = (receiver) => {
    //#region //* READ ME. DOCUMENTATION
      /**
       * @param receiver // Object receiver
       * * Function process :
       *    1. Get element chat block selected
       *    2. Get all element in list chats
       *    3. Remove className old chat block active if exist. Add className to chat block selected
       * * Result : Chat block selected will have class active
       */
    //#endregion
    //#region //* FUNCTION HANDLE 
      //Step 1
      const chat_block_selected = document.getElementById(receiver._id);
      const element_chat_block = chat_block_selected.getElementsByClassName("chat-block");
      //Step 2
      const list_chat_blocks = document.getElementsByClassName("row chat-block active");
      //Step 3
      if (list_chat_blocks.length){
        list_chat_blocks[0].classList = ("row chat-block");
        element_chat_block[0].classList = ("row chat-block active");
      }
      else 
        element_chat_block[0].classList = ("row chat-block active");
    //#endregion
  }
  const start_chat = (receiver) => {
    console.log('Start chat')
    // Join socket
    socket_handle_factory.send_to_server.start_chat(socket,receiver);
    // Load obj receivers information
    load_obj_receiver_infomation(receiver);
    // Active chat block DOM
    set_active_chat_block(receiver);
  }
  const create_html_receiver_info = (receiver) => {
    //#region //*READ ME. DOCUMENTATION
    /**
     * @param receiver Object receiver
     * * Function process : 
     *    1. Create element wrapper receiver info
     *      1.1. Set className
     *    2. Create element avatar
     *      2.1. Set className
     *      2.2. Set style background image = url(${receiver.detail.avatar})
     *    3. Create element name
     *      3.1. Set className
     *      3.2. Set innerHTML 
     *    4. Create element wrapper icon
     *      4.1. Set className
     *      4.2. Create element icon
     *        4.2.1. Set className
     *        4.2.2. Set innerHTML
     *    5. Append element avatar,name,icon (step 2,3,4) to wrapper receiver (step 1)
     *    6. Return wrapper receiver info
     * * Result : return element receiver info look like this : 
     *    <div className="wwrapper-receiver-info">
     *      <div className="receiver-info-avatar" style={{backgroundImage:`url(${receiver.detail.avatar})`}}>
     *      </div>
     *      <div className="receiver-info-name">
     *        {receiver.detail.name}
     *      </div>
     *      <div className="receiver-info-icon">
     *        <i className="material-icons">info</i>
     *      </div>
     *    </div>
     */
    //#endregion
    //#region //*FUNCTION HANDLE
      //Step 1
      const wrapper_receiver_info = document.createElement("div");
      wrapper_receiver_info.classList = "wrapper-receiver-info";
      //Step 2
      const div_avatar = document.createElement("div");
      div_avatar.classList = "receiver-info-avatar";
      div_avatar.style.backgroundImage = `url(${receiver.detail.avatar})`;
      //Step 3
      const div_name = document.createElement("div");
      div_name.innerHTML = receiver.detail.name;
      div_name.classList = "receiver-info-name";
      //Step 4
      const div_icon = document.createElement("div");
      div_icon.classList = "receiver-info-icon";
      const create_icon_info = document.createElement("i")
      create_icon_info.classList = "material-icons";
      create_icon_info.innerHTML = "info";
      div_icon.appendChild(create_icon_info);
      //Step 5
      wrapper_receiver_info.appendChild(div_avatar);
      wrapper_receiver_info.appendChild(div_name);
      wrapper_receiver_info.appendChild(div_icon);
      //Step 6
      return wrapper_receiver_info;
    //#endregion
  }
  const create_html_message = (message) => {
    //#region //*READ ME. DOCUMENTATION
      /**
       * * Function process :
       *  1. Create element wrap message
       *  2. Check sender_id === user ?
       *    2.1. True
       *      2.1.1. Set className
       *    2.2. False
       *      2.2.1. Set className
       *      2.2.2. Create element avatar message
       *      2.2.3. Set className & style background image by url avatar of sender
       *      2.2.4. Append element avatar message to wrap message created at step 1
       *  3. Create element message
       *    3.1. Set element message inner
       *    3.2. Append element message to wrap message created at step 1
       *  4. Return wrap message
       * * Result : return output look like this :
       *    <div className="messages sender || messages" >
       *      <div className="avatar-messages"
       *           style={{backgroundImage: `url("${obj_receivers[message.sender_id].avatar}")`}}>
       *      </div> || not
       *      <span>`${message.content}`</span>
       *    </div>
       */
    //#endregion
    //#region //*FUNCTION HANDLE
    //Step 1
    let wrap_message = document.createElement('div');
    //Step 2
    if (message.sender_id === user._id) 
      //Step 2.1.1
      wrap_message.className = 'messages sender';
    else {
      //Step 2.2.1
      wrap_message.className = 'messages';
      //Step 2.2.2
      let avatar_message = document.createElement('div');
      //Step 2.2.3
      avatar_message.className = "avatar-message";
      avatar_message.style.backgroundImage = `url("${obj_receivers[message.sender_id].avatar}")`
      //Step 2.2.4
      wrap_message.appendChild(avatar_message);
    }
    // Step 3
    let span_message = document.createElement('span');
    // Step 3.1
    span_message.innerHTML = `${message.content}`;
    // Step 3.2
    wrap_message.appendChild(span_message);

    // Step 4
    return wrap_message;
    //#endregion
  }
  const get_all_message = (receiver) => {
    //#region //*READ ME. DOCUMENTATION
      /**
       * @param receiver //Object receiver
       * * Function process :
       *  1. Get element main message & create element receiver info
       *  2. Call api get all messages of receivers
       *  3. When transfer messages completed then set main message empty
       *  4. Append element receiver info created in step 1 to element main message
       *  5. Map array messages response from api. With each loop :
       *    5.1. Create element message
       *    5.2. Append element message created in step 5.1 to main message 
       *  6. Scroll page to end of page
       * * Result : Completed this function make element main message look like
       *  <div id="main-message">
       *    <element receiver info />
       *    <element message />
       *    ...
       *    <element message />
       *  </div>
       */
    //#endregion
    //#region //*FUNCTION HANDLE
    console.log('Get messages');
    // Step 1 
    const main_message = document.getElementById('main-message');
    const html_receiver_info = create_html_receiver_info(receiver);
    // Step 2
    call_api({
      url : `${process.env.REACT_APP_API_URL}/chat/${receiver.type}/${receiver._id}/messages?page=1`
    })
      .then(response => {
        // Step 3
        main_message.innerHTML = '';
        // Step 4
        main_message.appendChild(html_receiver_info);
        // Step 5
        response.data.messages.map((message) => {
          // Step 5.1
          const html_message = create_html_message(message);
          // Step 5.2
          main_message.appendChild(html_message);
        })
        // Step 6
        main_message.scrollTop = main_message.scrollHeight;
      })
      .catch(error => {
        console.log(error)
        main_message.innerHTML = '';
        main_message.appendChild(html_receiver_info);
      })
    //#endregion
  }
  //#endregion
  //#region Render
  if(!user)
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
              {list_chats}
            </ul>
          </div>
        </div>
        <div className="col-9 p-0" style={{height:"100vh"}}>
          <div id="main-message" >
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
