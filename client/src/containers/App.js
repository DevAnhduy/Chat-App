import React, { useState,useEffect } from 'react';
import { Favorite_Main } from '../components/App_v2/Favorite';
import { Friend_Main } from '../components/App_v2/Friend';
import { Archived_Main } from '../components/App_v2/Archived';
import { Chat_Main, Chat_Sidebar } from '../components/App_v2/Chat';
import Notification from '../components/App_v2/Notification';
import { User_Profile, Edit_Profile } from '../components/App_v2/User_Profile';
import Navigation from '../components/App_v2/Navigation';
import { Voice_Call_Request, Voice_Call_Accepted } from '../components/App_v2/Voice_Call_Modal';
import { Video_Call_Accepted, Video_Call_Request } from '../components/App_v2/Video_Call_Modal';
import { Settings_Modal, Setting_Right } from '../components/App_v2/Setting';
import Add_Friend_Modal from '../components/App_v2/Add_Friend_Modal';
import New_Group_Modal from '../components/App_v2/New_Group_Modal';
import { CIRCLE_LOADING_WITH_LOGO } from '../components/Utils/circle_loading';
//import socket_handle_factory from '../../utils/socket_handle_factory';
import check_auth from '../utils/check-auth';
//import call_api from '../../utils/call_api';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux'
import './App_v2.scss';
import { set_user } from '../actions/user_action';


const { __server } = require('config/constant.json')
const io = require('socket.io-client');
// Init global variable
let socket;

const App = props => {
    const [is_auth,set_is_auth] = useState(false); //Check user is auth
    //const [user,set_user] = useState({}); // State contain object data of user
    const [receiver,set_receiver] = useState({});
    const [messages,set_messages] = useState([]);
    const [finding_messages,set_finding_messages] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
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
                //set_user({...is_auth}); // Set variable user
                dispatch(set_user(is_auth))
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
                    <Chat_Sidebar user={user} socket={socket} 
                                  set_messages={(messages) => set_messages(messages) }
                                  set_finding_messages={(status) => set_finding_messages(status)} 
                                  set_receiver={(receiver) => set_receiver(receiver)}
                                  />
                    <Friend_Main />
                    <Favorite_Main />
                    <Archived_Main />
                    <Chat_Main messages={messages} finding_messages={finding_messages} socket={socket}
                                receiver={receiver} /> 
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

export default App;