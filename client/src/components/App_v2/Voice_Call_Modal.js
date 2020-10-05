import React from 'react';
import { ReactComponent as On_Off_Sound_Svg } from '../../assets/svgs/on_off_sound.svg';

const Voice_Call_Request = props => {
    return (
        <div className="modal fade" id="voice_call_request" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content call-request">
                    <div className="modal-body">
                        <figure className="avatar avatar-xl">
                            <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="avatar user" />
                        </figure>
                        <h4 className="my-4">
                            Javascript
                            <span className="text-success"> đang gọi ....</span>
                        </h4>
                        <div className="call-action-button">
                            <button type="button" data-dismiss="modal" className="btn btn-danger btn-floating btn-lg">
                                <i className="mdi mdi-phone-cancel"></i>
                            </button>
                            <button data-toggle="modal" data-dismiss="modal" type="button" data-target="#voice_call_accepted" className="btn btn-success btn-pulse btn-floating btn-lg voice-call-accept" >
                                <i className="mdi mdi-phone-check"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Voice_Call_Accepted = props => {
    return (
        <div className="modal voice-call fade" id="voice_call_accepted" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document" >
                <div className="modal-content">
                    <div className="modal-body" style={{ background: "url(https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg)" }}>
                        <figure className="avatar mb-4 avatar-state-success avatar-xl">
                            <img src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" className="rounded-circle" alt="user avatar" />
                        </figure>
                        <div className="mb-2 font-weight-bold lead">Javascript</div>
                        <div className="mb-4 chat-stopwatch">12:00:11</div>
                        <div className="call-action-button">
                            <button type="button" className="btn btn-pulse btn-floating btn-lg mute-event" data-toggle="tooltip" title="Bật/Tắt tiéng">
                                <On_Off_Sound_Svg />
                            </button>
                            <button type="button" data-dismiss="modal" className="btn btn-danger btn-floating btn-lg" data-toggle="tooltip" title="Dừng nói chuyện" data-dismiss="modal">
                                <i className="mdi mdi-close"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Voice_Call_Request, Voice_Call_Accepted }
