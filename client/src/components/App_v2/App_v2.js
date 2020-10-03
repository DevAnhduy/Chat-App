import React, { useState } from 'react';
import Chat_Left_Sidebar from './Chat_Left_Sidebar';
import Favorite_Left_Sidebar from './Favorite_Left_Sidebar';
import Friend_Left_Sidebar from './Friend_Left_Sidebar';
import Archived_Left_Sidebar from './Archived_Left_Sidebar';
import Chat from './Chat';
import Notification from'./Notification';
import User_Profile from'./User_Profile';
import Setting from './Setting';
import Navigation from './Navigation';
import './App_v2.scss';
import { Voice_Call_Request,Voice_Call_Accepted } from './Voice_Call_Modal';
import { Video_Call_Accepted, Video_Call_Request } from './Video_Call_Modal';
import Edit_Profile from './Edit_Profile';

const App_v2 = props => {
    return (
        <div>
            <div className="layout">
                <Navigation />
                <Chat_Left_Sidebar />
                <Friend_Left_Sidebar />
                <Favorite_Left_Sidebar />
                <Archived_Left_Sidebar />
                <Chat /> 
            </div>
            <Notification />
            <User_Profile />
            <Setting />
            <Voice_Call_Request />
            <Voice_Call_Accepted />
            <Video_Call_Request />
            <Video_Call_Accepted />
            <Edit_Profile />
        </div>
    )
}

export default App_v2;