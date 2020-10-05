import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import PerfectScroll from 'react-perfect-scrollbar';
import Slider from 'react-slick';
import $ from 'jquery';
import socket_handle_factory from '../../utils/socket_handle_factory';
import call_api from '../../utils/call_api';
import no_message_image from '../../assets/images/chat/chat_empty.svg';
import { CIRCLE_LOADING } from '../Utils/circle_loading';
const { __server } = require('config/constant.json')

const Chat_Block = props => {
    return(
        <div className="list-group-item">
            <div>
                <figure className="avatar mr-3">
                    <img src={props.avatar} className="rounded-circle" alt="avatar" />
                </figure>
            </div>
            <div className="users-list-body">
                <div>
                    <h5>{props.name}</h5>
                    <p>
                        <i className="mdi mdi-check-all text-info mr-1"></i>
                        {props.last_message}
                    </p>
                </div>
                <div className="users-list-action">
                    <small className="text-muted">4:30 PM</small>
                    <div className="action-toggle">
                        <div className="dropdown">
                            <a data-toggle="dropdown">
                                <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item">Mở</a>
                                <a className="dropdown-item">Thông tin cá nhân</a>
                                <a className="dropdown-item text-danger">Xóa</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Chat_Sidebar = props => {
    const [list_chats,set_list_chats] = useState([]);  // State contain array element html of list chat
    const [obj_receivers,set_obj_receiver] = useState({}); //Object data information of receivers
    const [messages,set_messages] = useState({}); 
    //Load list chats && connect socket io
    useEffect(() => {
        if(props.user.list_chats){
        //Generate event socket io
        socket_handle_factory.receiver_from_server.message({socket: props.socket,user : props.user,obj_receivers});
        load_list_chats();
        };
    },[props.user])
    const story_slide_settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
    }
    const start_chat = (receiver) => {
        console.log('Start chat')
        // Join socket
        socket_handle_factory.send_to_server.start_chat(props.socket,receiver);
        // Load obj receivers information
        load_obj_receiver_information(receiver);
        // Active chat block DOM
        //set_active_chat_block(receiver);
    }
    const load_obj_receiver_information = (receiver) => {
        //#region //* READ ME. DOCUMENTATION
          /**
           * @param receiver Object receiver
           * * Function process :
           *    1. Check type of receiver
           *      1.1. Receiver type is users
           *        1.1.1. Set state obj_receivers
           *        1.1.2. Call function get_all_message 
           *      1.2. Receiver type is rooms
           *        1.2.1. Init str query users
           *        1.2.2. Map members in room. With each loop add member id to str query users (1.2.1) 
           *        1.2.3. Check if index is last then call api
           *        1.2.4. When transfer data completed then map response data to obj_receiver state & call get_all_message function
           * * Result : set state obj_receiver
           */
        //#endregion
        //#region //* FUNCTION HANDLE
          //Step 1.1
          if(receiver.type === 'users'){
            set_obj_receiver(obj_receivers[receiver._id] = receiver.detail);
            get_all_message(receiver);
          }
          else { //Step 1.2
            //Step 1.2.1
            let str_query_users = '';
            //Step 1.2.2
            receiver.detail.members.map((member,index) => {
              str_query_users += `_id=${member}&`;
              //Step 1.2.3
              if(index === receiver.detail.members.length - 1) {
                call_api({
                  url : `${process.env.REACT_APP_API_URL}/users?${str_query_users}`
                })
                  .then(members => {
                    //Step 1.2.4
                    members.data.data.map((member,index) => {
                      set_obj_receiver(obj_receivers[member._id] = member);
                      if(index === members.data.data.length - 1){
                        get_all_message(receiver);
                      }
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
    const load_list_chats = () => {
        //#region //* READ ME. DOCUMENTATION
          /**
           * * Function process :
           *    1. Init array request contain all axios request
           *    2. Loop array list chats of user. Init variable api_get_user,api_get_room. 
           *    Check if receiver type is room then assignment api_get_room to api_get_receiver else ...
           *    3. Push axios request to array request (1)
           *    4. Check if loop is last then call Promise.all with array request(1) to get receiver data
           *      4.1. Map response data from api. With each loop then add data detail to state user. Set state object receivers 
           *      4.2. Set state list chats with map list chats of state user
           * * Result : State list_chats contain list elements to render, state obj_receiver contain user data 
           */
        //#endregion
        //#region //* FUNCTION HANDLE
          if(props.user.list_chats.length){
            let arr_request = []; // Array contain all axios request
            let arr_room = [];
            props.user.list_chats.forEach((receiver,index) => {
              const api_get_user = `${process.env.REACT_APP_API_URL}/users/${receiver._id}`;
              const api_get_rooms = `${process.env.REACT_APP_API_URL}/chat/rooms/${receiver._id}`;
              let api_get_receiver = '';
              if(receiver.type === 'rooms'){
                api_get_receiver = api_get_rooms;
                arr_room.push(receiver);
              } 
              else 
                api_get_receiver = api_get_user;
                arr_request.push(
                    call_api({
                    url: api_get_receiver,
                    method: 'get'
                    })
                )
              //Check last element then call promise all
              if(index === props.user.list_chats.length - 1) {
                Promise.all(arr_request)
                  .then((receivers) => {
                    arr_room.forEach(room => {
                      //socket_handle_factory.send_to_server.start_chat(socket, room);
                    })
                    //Add detail to list chats
                    receivers.forEach(receiver => {
                      const receiver_index = props.user.list_chats.findIndex(user_in_list_chat => user_in_list_chat._id === receiver.data.data._id);
                      props.user.list_chats[receiver_index].detail = receiver.data.data;
                    })
                    //Set list chats
                    set_list_chats(props.user.list_chats.map((receiver,index) => {
                      return (
                        <Link key={index}
                              id={receiver._id}
                              to={`/chat/${receiver.type}/${receiver._id}`}
                              onClick={() => { start_chat(receiver); props.set_finding_messages(true)}}
                        >
                          <Chat_Block key={index}
                                      name={receiver.detail ? receiver.detail.name : ''}
                                      avatar={receiver.detail.avatar ? receiver.detail.avatar : ''}
                                      last_message="Test something like this"
                            />
                        </Link>
                      )
                    }))
                  })
              }
          })
            set_obj_receiver(obj_receivers[props.user._id] = props.user)
          }
          else {
            set_list_chats([]);
          }
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
        console.log(main_message)
        // Step 2
        call_api({
          url : `${process.env.REACT_APP_API_URL}/chat/${receiver.type}/${receiver._id}/messages?page=1`
        })
          .then(response => {
            // Step 3
            let messages = [];
            let same_senders = [];
            //main_message.innerHTML = '';
            // Step 5
            response.data.messages.map((message,index) => {
                if(!same_senders.length) {
                    same_senders.push(
                        <Message content={message.content} 
                                 sender_id={message.sender_id}
                        />
                    )
                }
                else {
                    if(same_senders[same_senders.length - 1].props.sender_id === message.sender_id) {
                        same_senders.push(
                            <Message content={message.content} 
                                    sender_id={message.sender_id}
                            />
                        )
                    } 
                    else {
                        messages.push(
                            <div className={`message-item ${same_senders[same_senders.length - 1].props.sender_id === props.user._id ? 'out' : 'in'}`}>
                                <div className="message-avatar">
                                    <figure className="avatar avatar-sm">
                                        <img src={obj_receivers[same_senders[same_senders.length - 1].props.sender_id].avatar} className="rounded-circle" alt="avatar" />
                                    </figure>
                                    <div>
                                        <h5>{obj_receivers[same_senders[same_senders.length - 1].props.sender_id].name}</h5>
                                        <div className="time">10:12</div>
                                    </div>
                                </div>
                                {same_senders}
                            </div>
                        )
                        same_senders = [];
                        same_senders.push(
                            <Message content={message.content} 
                                    sender_id={message.sender_id}
                            />
                        )
                    }
                }

                if(index === response.data.messages.length - 1) {
                    messages.push(
                        <div className={`message-item ${message.sender_id === props.user._id ? 'out' : 'in'}`}>
                            <div className="message-avatar">
                                <figure className="avatar avatar-sm">
                                    <img src={obj_receivers[message.sender_id].avatar} className="rounded-circle" alt="avatar" />
                                </figure>
                                <div>
                                    <h5>{obj_receivers[message.sender_id].name}</h5>
                                    <div className="time">10:12</div>
                                </div>
                            </div>
                            {same_senders}
                        </div>
                    )
                }
            })
            //set_messages
            // Step 6
            main_message.scrollTop = main_message.scrollHeight;
            props.set_messages([...messages])
            props.set_finding_messages(false);
          })
          .catch(error => {
            console.log(error)
            //main_message.innerHTML = '';
          })
        //#endregion
    }
    return (
        <div id="chats" className="left-sidebar open" >
            <div className="left-sidebar-header">
                <div className="story-block">
                    <h4 className="mb-4">Stories</h4>
                    <Slider {...story_slide_settings} className="story-items" >
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-primary">
                                <img src="https://www.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png" className="rounded-circle" alt="image" />
                                <span className="story-content">NodeJS</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-primary">
                                <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="image" />
                                <span className="story-content">Javascript</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-primary">
                                <img src="https://www.iconfinder.com/data/icons/black-white-social-media/64/social_media_logo_github-512.png" className="rounded-circle" alt="image" />
                                <span className="story-content">Github</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar">
                                <img src="https://images.viblo.asia/1d4ce923-d919-4ccf-af8a-9e444ab8d793.jpg" className="rounded-circle" alt="image" />
                                <span className="story-content">DenoJS</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-primary">
                                <span className="avatar-title bg-info rounded-circle">A</span>
                                <span className="story-content">Atom</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar avatar-border-success">
                                <img src="https://www.seekpng.com/png/detail/377-3772047_sass-logo.png" className="rounded-circle" alt="image" />
                                <span className="story-content">SASS</span>
                            </a>
                        </div>
                        <div className="story-item">
                            <a href="/chat" className="avatar">
                                <img src="https://kalvanaveen.github.io/WebDevelopmentResources.github.io/Images/Express-JS-min.png" className="rounded-circle" alt="image" />
                                <span className="story-content">ExpressJS</span>
                            </a>
                        </div> 
                    </Slider>
                </div>
                <form>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn" type="button">
                                <i className="ti-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control" placeholder="Tìm kiếm bạn bè, phòng chat,..."></input>
                    </div>
                </form>
            </div>
            <PerfectScroll className="left-sidebar-content">
                {list_chats.length ? list_chats : <CIRCLE_LOADING width="100%" height="100%" />}
            </PerfectScroll>
        </div>
    )
}
const Chat_Main = props => {
    const check_exist_message = ()  => {
        if (props.finding_messages) 
            return <CIRCLE_LOADING width="100%" height="100%" />;
        else if (props.messages.length)
            return props.messages;
        else 
            return (
                <div className="no-message-content">
                    <div className="row mb-5">
                        <div className="col-md-4 offset-4">
                            <img src={no_message_image} className="img-fluid" alt="No message" />
                        </div>
                    </div>
                    <p className="lead">Không tìm thấy tin nhắn nào. Chọn 1 cuộc trò chuyện để bắt đầu trò chuyện</p>
                </div>
            )
    }
    return (
        <div className="chat">
            <div className="chat-header">
                <div className="chat-header-user">
                    <figure className="avatar avatar-state-success">
                        <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar user"/>
                    </figure>
                    <div>
                        <h5>Javascript</h5>
                        <small className="text-success">Online</small>
                    </div>
                </div>
                <div className="chat-header-action" data-intro-js="7">
                    <ul className="list-inline">
                        <li className="list-inline-item d-inline d-lg-none">
                            <a className="btn btn-danger btn-floating example-chat-close">
                                <i className="mdi mdi-arrow-left"></i>
                            </a>
                        </li>
                        <li className="list-inline-item" data-toggle="modal" title="Voice call" data-target="#voice_call_request" >
                            <a className="btn btn-success btn-floating voice-call-request">
                                <i className="mdi mdi-phone"></i>
                            </a>
                        </li>
                        <li className="list-inline-item" data-toggle="modal" title="Video call" data-target="#video_call_request" >
                            <a className="btn btn-warning btn-floating video-call-request">
                                <i className="mdi mdi-video-outline"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a className="btn btn-dark btn-floating" data-toggle="dropdown">
                                <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a onClick={()=>$('#user-profile').addClass('open')} data-right-sidebar="user-profile" className="dropdown-item">Thông tin cá nhân</a>
                                <a className="dropdown-item example-close-selected-chat">Đóng chat</a>
                                <a className="dropdown-item">Thêm vào lưu trữ</a>
                                <a className="dropdown-item example-delete-chat">Xóa chat</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-danger example-block-user">Chặn</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <PerfectScroll className="chat-body">
                <div className="messages" id="main-message">
                    {check_exist_message()}
                </div>
            </PerfectScroll>
            <div className="chat-footer">
                <form className="d-flex">
                    <div className="dropdown">
                        <button className="btn btn-danger btn-floating mr-3" data-toggle="dropdown" title="Emoji" type="button">
                            <i className="mdi mdi-face"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-big p-0">
                            <div className="dropdown-menu-search">
                                <input type="text" className="form-control" placeholder="Tìm kiếm biểu cảm..."></input>
                            </div>
                            <div className="emojis chat-emojis">
                                <ul>
                                    <li>😁</li>
                                    <li>😂</li>
                                    <li>😃</li>
                                    <li>😄</li>
                                    <li>😅</li>
                                    <li>😆</li>
                                    <li>😉</li>
                                    <li>😊</li>
                                    <li>😋</li>
                                    <li>😌</li>
                                    <li>😍</li>
                                    <li>😏</li>
                                    <li>😒</li>
                                    <li>😓</li>
                                    <li>😔</li>
                                    <li>😖</li>
                                    <li>😘</li>
                                    <li>😝</li>
                                    <li>😠</li>
                                    <li>😢</li>
                                    <li>🙅</li>
                                    <li>🙆</li>
                                    <li>🙇</li>
                                    <li>🙈</li>
                                    <li>🙉</li>
                                    <li>🙊</li>
                                    <li>🙋</li>
                                    <li>🙌</li>
                                    <li>🙍</li>
                                    <li>🙎</li>
                                    <li>🙏</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-danger btn-floating mr-3" data-toggle="dropdown" title="Emoji" type="button">
                            <i className="mdi mdi-plus"></i>
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item">Vị trí</a>
                            <a className="dropdown-item">Tệp</a>
                            <a className="dropdown-item">Tài liệu</a>
                            <a className="dropdown-item">File</a>
                            <a className="dropdown-item">Video</a>
                        </div>
                    </div>
                    <input type="text" className="form-control form-control-main" placeholder="Nhập tin nhắn...." />
                    <div>
                        <button className="btn btn-primary ml-2 btn-floating" type="submit">
                            <i className="mdi mdi-send"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
const Message = props => {
    return (
        <div className="message-content">
            <div className="message-text">{props.content}</div>
            <div className="dropdown">
                <a data-toggle="dropdown">
                    <i className="mdi mdi-dots-horizontal"></i>
                </a>
                <div className="dropdown-menu">
                    <a className="dropdown-item">Trả lời</a>
                    <a className="dropdown-item">Chuyển tiếp</a>
                    <a className="dropdown-item">Sao chép</a>
                    <a className="dropdown-item example-delete-message">Xóa</a>
                </div>
            </div>
        </div>
    )
}

export { Chat_Main, Chat_Block, Chat_Sidebar }