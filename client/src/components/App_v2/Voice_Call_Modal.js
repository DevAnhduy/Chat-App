import React from 'react';

const Voice_Call_Request = props => {
    return (
        <div className="modal fade" id="voice_call_request" tabIndex="-1" role="dialog" aria-hidden="true">
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
        <div className="modal voice-call fade" id="voice_call_accepted" tabIndex="-1" role="dialog" aria-hidden="true">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-volume-2">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
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
