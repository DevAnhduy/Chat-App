import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import call_api from '../../utils/call_api';

const Add_Friend_Modal = props => {
    const [count_user_selected,set_count_user_selected] = useState(0);
    const [list_user_selected,set_list_user_selected] = useState([]);
    const user = useSelector((state) => state.user);
    const delete_user_selected = (id) => {
        console.log(list_user_selected)
        const delete_user_index = list_user_selected.findIndex(user_selected => {
            console.log(user_selected.props.id)
            return user_selected.props.id === id;
        });
        console.log(list_user_selected.findIndex(user_selected => {
            return user_selected.props.id === id;
        }))
        set_list_user_selected([...list_user_selected.splice(delete_user_index,1)])
    }

    const input_mobile_friend = useRef("");
    const add_invite_friend = () => {
        if(input_mobile_friend.current.value) {
            call_api({
                url : `/users/search?mobile=${input_mobile_friend.current.value}`
            })
                .then(response => {
                    const user_find = response.data.data;
                    if(user_find && !list_user_selected.some(user_selected => user_selected.props.id === user_find._id )) {
                        const new_user_selected = (
                            <Add_Friend_Selected name={user_find.name} avatar={user_find.avatar} 
                                                 mobile={user_find.mobile} id={user_find._id} 
                                                 delete_user_selected={(id) => {
                                                     delete_user_selected(id)
                                                     set_count_user_selected(list_user_selected.length + 1)
                                                 }}
                                                 />
                        )
                        set_list_user_selected([...list_user_selected,new_user_selected])
                        set_count_user_selected(list_user_selected.length + 1)
                    }
                    else {
                        console.log("Not found")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    const submit_invite_friend = () => {
        if(list_user_selected.length) {
            console.log("Submit add friend")
            list_user_selected.map((user_selected) => {
                call_api({
                    url : `${process.env.REACT_APP_API_URL}/users/request-friend/${user_selected.props.id}`,
                    method: 'post',
                    data: {
                        user_requested: user._id
                    }
                })
            })
        }
    }

    console.log(list_user_selected)
    return (
        <div className="modal fade" id="add_friend" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <i className="mdi mdi-account-plus-outline"> Thêm bạn bè</i>
                        </h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Đóng">
                            <i className="mdi mdi-close"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="mb-4">
                            <div className="form-group">
                                <label for="add_with_mobile" className="col-form-label">Số điện thoại</label>
                                <div className="input-group mb-3">
                                    <input ref={input_mobile_friend} type="text" className="form-control" id="add_with_mobile" placeholder="Số điện thoại" />
                                    <div className="input-group-append">
                                        <button onClick={add_invite_friend} type="button" className="btn btn-success">
                                            <i className="mdi mdi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="d-flex justify-content-between">
                            <span>Người dùng</span>
                            <span className="text-muted small">Có {count_user_selected} người được chọn</span>
                        </div>
                        <hr />
                        <div>
                            <ul className="list-group list-group-unlined" id="list-user-selected">
                                {list_user_selected}
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={submit_invite_friend} type="button" className="btn btn-primary">Gửi lời mời</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Add_Friend_Selected = props => {
    return (
        <li className="list-group-item px-0 d-flex">
            <figure className="avatar mr-3">
                <img src={props.avatar} className="rounded-circle" alt="image" />
            </figure>
            <div>
                <div>{props.name}</div>
                <div className="small text-muted">{props.mobile}</div>
            </div>
            <a onClick={() => props.delete_user_selected(props.id)} className="text-danger ml-auto" data-toggle="tooltip" title="Xoá">
                <i className="mdi mdi-delete-outline"></i>
            </a>
        </li>
    )
}

export default Add_Friend_Modal;