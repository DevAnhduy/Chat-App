import React from 'react';

const Video_Call_Request = props => {
    return (
        <div className="modal fade" id="video_call_request" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content call-request">
                    <div className="modal-body">
                        <figure className="avatar avatar-xl">
                            <img className="rounded-circle" alt="image" src="https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg" />
                        </figure>
                        <h4 className="my-4">
                            Javascript
                            <span className="text-success"> đang gọi....</span>
                        </h4>
                        <div className="call-action-button">
                            <button type="button" className="btn btn-danger btn-floating btn-lg" data-dismiss="modal" >
                                <i className="mdi mdi-video-minus-outline"></i>
                            </button>
                            <button type="button" data-toggle="modal" data-target="#video_call_accepted" data-dismiss="modal" className="btn btn-success btn-pulse btn-floating btn-lg video-call-request-accept">
                                <i className="mdi mdi-video-check-outline"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Video_Call_Accepted = props => {
    return (
        <div className="modal call fade" id="video_call_accepted" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-zoom" role="document">
                <div className="modal-content">
                    <div className="modal-body" style={{ background:"url(https://st.depositphotos.com/1796420/4113/v/950/depositphotos_41138921-stock-illustration-vector-icon-of-orange-javascript.jpg)"}}>
                        <div className="call-time chat-stopwatch">
                            01:12:13
                        </div>
                        <div className="call-action">
                            <div className="call-action-button">
                                <button type="button" className="btn btn-pulse btn-floating btn-lg mute-event" data-toggle="tooltip" data-placement="right" title="Tắt/Bật tiếng">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-volume-2">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                </button>
                                <button type="button" className="btn btn-danger btn-floating btn-lg" data-toggle="tooltip" data-placement="right" title="Dừng nói chuyện">
                                    <i className="mdi mdi-close"></i>
                                </button>
                            </div>
                            <div className="call-users">
                                <figure className="avatar" data-toggle="tooltip" data-placement="left" title="NodeJS">
                                    <img src="https://www.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png" className="rounded-circle" alt="avatar user" />
                                </figure>
                                <figure className="avatar" data-toggle="tooltip" data-placement="left" title="NodeJS">
                                    <img src="https://www.iconfinder.com/data/icons/black-white-social-media/64/social_media_logo_github-512.png" className="rounded-circle" alt="avatar user" />
                                </figure>
                                <figure className="avatar" data-toggle="tooltip" data-placement="left" title="NodeJS">
                                    <img src="https://images.viblo.asia/1d4ce923-d919-4ccf-af8a-9e444ab8d793.jpg" className="rounded-circle" alt="avatar user" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Video_Call_Request,Video_Call_Accepted }