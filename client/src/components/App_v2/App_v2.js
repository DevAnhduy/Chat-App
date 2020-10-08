import React, { useState,useEffect } from 'react';
import { Favorite_Main } from './Favorite';
import { Friend_Main } from './Friend';
import { Archived_Main } from './Archived';
import  { Chat_Main,Chat_Sidebar } from './Chat';
import Notification from'./Notification';
import{ User_Profile,Edit_Profile } from'./User_Profile';
import Navigation from './Navigation';
import { Voice_Call_Request,Voice_Call_Accepted } from './Voice_Call_Modal';
import { Video_Call_Accepted, Video_Call_Request } from './Video_Call_Modal';
import  { Settings_Modal,Setting_Right } from './Setting';
import Add_Friend_Modal from './Add_Friend_Modal';
import New_Group_Modal from './New_Group_Modal';
import { CIRCLE_LOADING_WITH_LOGO } from '../Utils/circle_loading';
import socket_handle_factory from '../../utils/socket_handle_factory';
import check_auth from '../../utils/check-auth';
import call_api from '../../utils/call_api';
import { Link } from 'react-router-dom';
import './App_v2.scss';

const { __server } = require('config/constant.json')
const io = require('socket.io-client');
// Init global variable
let socket;

const App_v2 = props => {
    const [is_auth,set_is_auth] = useState(false); //Check user is auth
    const [user,set_user] = useState({}); // State contain object data of user
    const [list_chats,set_list_chats] = useState();  // State contain array element html of list chat
    const [obj_receivers,set_obj_receiver] = useState({}); //Object data information of receivers
    const [messages,set_messages] = useState([]);
    const [finding_messages,set_finding_messages] = useState(false);
    const [receiver,set_receiver] = useState({});
    //Load user
    useEffect(() => {
        //Call function check auth
        check_auth(is_auth => {
            if (is_auth) {
                console.log('Authentication success')
                //Connect socket io
                socket = io(__server, { // Connect socket io
                    query: "authorization=" + window.localStorage.token
                });
                set_user({...is_auth}); // Set variable user
                set_is_auth(true);
            }
            else
                window.location = '/sign-in';
        })
    },[]);
    //Render
    if(!is_auth)
        return <CIRCLE_LOADING_WITH_LOGO />
    else
        return (
            <div className="chat-app dark">
                <div className="layout">
                    <Navigation avatar={user.avatar} />
                    <Chat_Sidebar user={user} socket={socket} messages={messages} obj_receivers={obj_receivers}
                                  set_messages={(messages) => set_messages(messages) }
                                  set_finding_messages={(status) => set_finding_messages(status)} 
                                  set_receiver={(receiver) => {set_receiver(receiver)}}
                                  set_obj_receiver={(obj_receivers) => set_obj_receiver(obj_receivers)}
                                  />
                    <Friend_Main />
                    <Favorite_Main />
                    <Archived_Main />
                    <Chat_Main messages={messages} socket={socket}
                               finding_messages={finding_messages}
                               receiver={receiver} user={user}  /> 
                </div>
                <Notification />
                <User_Profile />
                <Setting_Right />
                <Settings_Modal />
                <Voice_Call_Request />
                <Voice_Call_Accepted />
                <Video_Call_Request />
                <Video_Call_Accepted />
                <Edit_Profile />
                <Add_Friend_Modal />
                <New_Group_Modal />
            </div>
        )
}

export default App_v2;