import React, { useEffect,useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import call_api from '../../utils/call_api';
//import { get_all_message } from './Chat';

const Friend_Block = props => {
    return(
        <li className="list-group-item" onClick={() => props.get_all_message(props) }>
            <div>
                <figure className="avatar mr-3">
                    <img src={props.avatar} className="rounded-circle" alt="Friend avatar" />
                </figure>
            </div>
            <div className="users-list-body">
                <div>
                    <h5>{props.name}</h5>
                    <p>{props.mobile}</p>
                </div>
                <div className="users-list-action">
                    <div className="action-toggle">
                        <div className="dropdown">
                            <a data-toggle="dropdown"><i className="mdi mdi-dots-horizontal"></i></a>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item">Trò chuyện</a>
                            <a className="dropdown-item">Thông tin cá nhân</a>
                            <a className="dropdown-item">Chặn</a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
const Friend_Main = props => {
    const user = useSelector((state) => state.user);
    const [list_friends,set_list_friends] = useState([]);
    
    useEffect(() => {
       call_api({
           url : `/users/friends/${user._id}`
       }) 
            .then(response => {
                set_list_friends([...response.data.data.friends]);
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    const render_list_friend = () => {
        return list_friends.map(friend => {
            return <Friend_Block avatar={friend.avatar} 
                                 name={friend.name} 
                                 mobile={friend.mobile} 
                                 _id={friend._id}
                                 type="users" 
                                 get_all_message={(receiver) => props.get_all_message(receiver)}
                                />
        })
    }

    return (
        <ul className="list-group list-group-flush">
            {render_list_friend()}
        </ul>
    )
}

export { Friend_Block, Friend_Main };